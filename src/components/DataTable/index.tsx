import React, { useEffect, useState, useRef } from "react";
import styles from "./DataTable.module.css";

interface Action {
  label: string;
  onClick: (row: { [x: string]: unknown }) => void;
}

interface DataTableProps {
  fetchData: (
    params?: { page: number; search?: string } | undefined
  ) => Promise<{
    data: { [x: string]: string | number }[];
    total?: number;
  }>;
  columns: { label: string; accessor: string }[];
  actions?: Action[];
  loading: boolean;
  isNavigate?: boolean;
  isSearch?: boolean;
  isExport?: boolean;
  hasCheckbox?: boolean;
  onSelectedRows?: (rows: { [x: string]: unknown }[]) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  fetchData,
  columns,
  actions,
  loading,
  isNavigate = true,
  isSearch = true,
  isExport = true,
  hasCheckbox = false,
  onSelectedRows,
}) => {
  const [data, setData] = useState<{ [x: string]: unknown }[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState<{ [x: string]: unknown }[]>(
    []
  );
  const limit = isNavigate ? 10 : 100000;

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const result = await (isSearch
          ? fetchData({ page, search })
          : fetchData());

        if (isMounted) {
          setData(result.data);
          setTotal(result?.total ?? 0);
          // Reset selected rows when data changes
          setSelectedRows([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [search, page, fetchData, isSearch, isNavigate]);

  useEffect(() => {
    if (onSelectedRows) {
      onSelectedRows(selectedRows);
    }
  }, [selectedRows, onSelectedRows]);

  const totalPages = Math.ceil(total / limit);

  const handleRowSelection = (
    row: { [x: string]: unknown },
    isChecked: boolean
  ) => {
    setSelectedRows((prev) => {
      if (isChecked) {
        return [...prev, row];
      } else {
        return prev.filter((r) => r !== row);
      }
    });
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows([...data]);
    } else {
      setSelectedRows([]);
    }
  };

  const exportToCSV = () => {
    const csvHeader = [
      ...(hasCheckbox ? ["Selected"] : []),
      ...columns.map((col) => col.label),
      ...(actions ? ["Actions"] : []),
    ].join(",");

    const csvRows = data.map((row) =>
      [
        ...(hasCheckbox ? [selectedRows.includes(row) ? "Yes" : "No"] : []),
        ...columns.map(
          (col) => `"${(row as Record<string, unknown>)[col.accessor] ?? ""}"`
        ),
      ].join(",")
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printContents = tableRef.current?.outerHTML;
    const win = window.open("", "", "width=800,height=600");
    if (win && printContents) {
      win.document.write(
        `<html><head><title>Print</title></head><body>${printContents}</body></html>`
      );
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div>
          {isSearch && (
            <input
              type="text"
              className={styles.search}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          )}
        </div>
        {isExport && (
          <div className={styles.exportButtons}>
            <button onClick={exportToCSV}>{"\u{2B07}\uFE0F"}</button>
            <button onClick={handlePrint}>{"\u{1F5B6}"}</button>
          </div>
        )}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table} ref={tableRef}>
          <thead>
            <tr>
              {hasCheckbox && (
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedRows.length === data.length && data.length > 0
                    }
                    disabled={data.length === 0}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.accessor}>{col.label}</th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {hasCheckbox && (
                    <td>
                      <div className={styles.skeletonRow}></div>
                    </td>
                  )}
                  {columns.map((_, idx) => (
                    <td key={idx}>
                      <div className={styles.skeletonRow}></div>
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className={styles.skeletonRow}></div>
                    </td>
                  )}
                </tr>
              ))
            ) : data.length ? (
              data.map((row, i) => (
                <tr key={i}>
                  {hasCheckbox && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={(e) =>
                          handleRowSelection(row, e.target.checked)
                        }
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.accessor}>
                      {(() => {
                        const value = (row as Record<string, unknown>)[
                          col.accessor
                        ];

                        if (!value) return " -";

                        if (typeof value === "string") {
                          const lower = value.toLowerCase();

                          // Check for image
                          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(lower)) {
                            return (
                              <img
                                src={
                                  import.meta.env.VITE_BACKEND_SERVER + value
                                }
                                alt={col.accessor}
                                style={{ maxWidth: "80px", maxHeight: "80px" }}
                              />
                            );
                          }

                          // Check for video
                          if (/\.(mp4|webm|ogg)$/i.test(lower)) {
                            return (
                              <video
                                controls
                                style={{ maxWidth: "120px", maxHeight: "80px" }}
                              >
                                <source
                                  src={
                                    import.meta.env.VITE_BACKEND_SERVER + value
                                  }
                                />
                                Your browser does not support the video tag.
                              </video>
                            );
                          }

                          // Check for audio
                          if (/\.(mp3|wav|ogg)$/i.test(lower)) {
                            return (
                              <audio controls>
                                <source
                                  src={
                                    import.meta.env.VITE_BACKEND_SERVER + value
                                  }
                                />
                                Your browser does not support the audio tag.
                              </audio>
                            );
                          }

                          // Check for PDF or DOC
                          if (/\.(pdf|doc|docx)$/i.test(lower)) {
                            return (
                              <a
                                href={
                                  import.meta.env.VITE_BACKEND_SERVER + value
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                📄 {/* PDF/Doc symbol */}
                                <span>Open Document</span>
                              </a>
                            );
                          }

                          // Otherwise treat as text
                          return value;
                        }

                        if (
                          typeof value === "number" ||
                          typeof value === "boolean"
                        ) {
                          return String(value);
                        }

                        return JSON.stringify(value);
                      })()}
                    </td>
                  ))}

                  {actions && (
                    <td>
                      <div className={styles.action}>
                        {actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => action.onClick(row)}
                            className={styles.actionBtn}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length + (actions ? 1 : 0) + (hasCheckbox ? 1 : 0)
                  }
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isNavigate && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
