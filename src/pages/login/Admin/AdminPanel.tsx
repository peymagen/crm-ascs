// src/pages/AdminPanel.tsx
import React, { useState } from "react";
import "./AdminPanel.css";

// Helper function to sort menus or submenus by their position
const sortMenus = (menus: any[]) => {
  if (!menus) return [];
  return [...menus].sort((a, b) => Number(a.position) - Number(b.position));
};

// Custom Form Hook
function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => setFormData(initialState);

  return { formData, handleChange, resetForm, setFormData };
}

// Regex for validation
const urlRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // Matches "my-seo-url"
const numberRegex = /^[1-9]\d*$/; // Matches positive integers

// Modal component for adding a new menu
function AddMenuModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newMenu: any) => void;
}) {
  const { formData, handleChange } = useForm({
    website: "English",
    displayOnMenu: "Yes",
    displayArea: "Main Navigation",
    menuName: "",
    menuSubHeading: "",
    menuDescription: "",
    menuPosition: "",
    seoUrl: "",
    otherUrl: "",
    target: "Same Window",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.menuName || !formData.seoUrl || !formData.menuPosition) {
      alert(
        "Please fill in all required fields: Menu Name, SEO URL, and Menu Position."
      );
      return;
    }
    if (!urlRegex.test(formData.seoUrl)) {
      alert("SEO URL must be in a valid format (e.g., 'my-seo-url').");
      return;
    }
    if (!numberRegex.test(formData.menuPosition)) {
      alert("Menu Position must be a positive number.");
      return;
    }
    onAdd({
      id: Math.random().toString(36).substring(7),
      name: formData.menuName,
      path: formData.seoUrl,
      subheading: formData.menuSubHeading,
      description: formData.menuDescription,
      position: formData.menuPosition,
      target: formData.target,
      displayArea: formData.displayArea,
      seoUrl: formData.seoUrl,
      otherUrl: formData.otherUrl,
      submenus: [],
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add New Menu</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>General Information</h3>
            </div>
            <div>
              <label htmlFor="website" className="form-label">
                Select Website
              </label>
              <select
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="form-select"
              >
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <label htmlFor="displayArea" className="form-label">
                Display Area/Region
              </label>
              <select
                id="displayArea"
                value={formData.displayArea}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Main Navigation">Main Navigation</option>
                <option value="Bottom Menu">Bottom Menu</option>
              </select>
            </div>
            <div>
              <label htmlFor="displayOnMenu" className="form-label">
                Display on Menu
              </label>
              <select
                id="displayOnMenu"
                value={formData.displayOnMenu}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="menuName" className="form-label">
                Enter Menu Name *
              </label>
              <input
                type="text"
                id="menuName"
                value={formData.menuName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Menu Name"
              />
            </div>
            <div>
              <label htmlFor="menuSubHeading" className="form-label">
                Enter Menu Sub Heading
              </label>
              <input
                type="text"
                id="menuSubHeading"
                value={formData.menuSubHeading}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Mouse Hover Text"
              />
            </div>
            <div>
              <label htmlFor="menuPosition" className="form-label">
                Enter Menu Position *
              </label>
              <input
                type="text"
                id="menuPosition"
                value={formData.menuPosition}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Menu Position"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="menuDescription" className="form-label">
                Enter Menu Description
              </label>
              <textarea
                id="menuDescription"
                rows={3}
                value={formData.menuDescription}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Enter Menu Description"
              ></textarea>
            </div>
          </div>
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>Hyperlink Information</h3>
            </div>
            <div>
              <label htmlFor="seoUrl" className="form-label">
                Enter SEO URL *
              </label>
              <input
                type="text"
                id="seoUrl"
                value={formData.seoUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter SEO Friendly URL"
              />
            </div>
            <div>
              <label htmlFor="otherUrl" className="form-label">
                Enter Other URL
              </label>
              <input
                type="text"
                id="otherUrl"
                value={formData.otherUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Other URL (to link with other Page)"
              />
            </div>
            <div>
              <label htmlFor="target" className="form-label">
                Select Target *
              </label>
              <select
                id="target"
                value={formData.target}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Same Window">Same Window</option>
                <option value="New Window">New Window</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal component for adding a new submenu
function AddSubmenuModal({
  onClose,
  onAdd,
  menus,
}: {
  onClose: () => void;
  onAdd: (parentMenuId: string, newSubmenu: any) => void;
  menus: any[];
}) {
  const { formData, handleChange } = useForm({
    website: "English",
    parentMenu: "",
    menuName: "",
    menuSubHeading: "",
    menuDescription: "",
    menuPosition: "",
    seoUrl: "",
    otherUrl: "",
    target: "Same Window",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.parentMenu ||
      !formData.menuName ||
      !formData.seoUrl ||
      !formData.menuPosition
    ) {
      alert(
        "Please fill in all required fields: Select Main Menu, Menu Name, SEO URL, and Menu Position."
      );
      return;
    }
    if (!urlRegex.test(formData.seoUrl)) {
      alert("SEO URL must be in a valid format (e.g., 'my-seo-url').");
      return;
    }
    if (!numberRegex.test(formData.menuPosition)) {
      alert("Menu Position must be a positive number.");
      return;
    }
    onAdd(formData.parentMenu, {
      id: Math.random().toString(36).substring(7),
      name: formData.menuName,
      path: formData.seoUrl,
      subheading: formData.menuSubHeading,
      description: formData.menuDescription,
      position: formData.menuPosition,
      target: formData.target,
      seoUrl: formData.seoUrl,
      otherUrl: formData.otherUrl,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add New Submenu</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>General Information</h3>
            </div>
            <div>
              <label htmlFor="website" className="form-label">
                Select Website
              </label>
              <select
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="form-select"
              >
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <label htmlFor="parentMenu" className="form-label">
                Select Main Menu *
              </label>
              <select
                id="parentMenu"
                value={formData.parentMenu}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Choose Menu --</option>
                {sortMenus(menus).map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="menuName" className="form-label">
                Enter Menu Name *
              </label>
              <input
                type="text"
                id="menuName"
                value={formData.menuName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Menu Name"
              />
            </div>
            <div>
              <label htmlFor="menuSubHeading" className="form-label">
                Enter Menu Sub Heading
              </label>
              <input
                type="text"
                id="menuSubHeading"
                value={formData.menuSubHeading}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Mouse Hover Text"
              />
            </div>
            <div>
              <label htmlFor="menuPosition" className="form-label">
                Enter Menu Position *
              </label>
              <input
                type="text"
                id="menuPosition"
                value={formData.menuPosition}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Menu Position"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="menuDescription" className="form-label">
                Enter Menu Description
              </label>
              <textarea
                id="menuDescription"
                rows={3}
                value={formData.menuDescription}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Enter Menu Description"
              ></textarea>
            </div>
          </div>
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>Hyperlink Information</h3>
            </div>
            <div>
              <label htmlFor="seoUrl" className="form-label">
                Enter SEO URL *
              </label>
              <input
                type="text"
                id="seoUrl"
                value={formData.seoUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter SEO Friendly URL"
              />
            </div>
            <div>
              <label htmlFor="otherUrl" className="form-label">
                Enter Other URL
              </label>
              <input
                type="text"
                id="otherUrl"
                value={formData.otherUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter Other URL (to link with other Page)"
              />
            </div>
            <div>
              <label htmlFor="target" className="form-label">
                Select Target *
              </label>
              <select
                id="target"
                value={formData.target}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Same Window">Same Window</option>
                <option value="New Window">New Window</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Submenu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal component for delete confirmation
function DeleteConfirmationModal({
  onConfirm,
  onCancel,
  message,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-container-sm">
        <h2 className="modal-title">Confirm Deletion</h2>
        <p className="modal-message">{message} This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

interface AdminPanelProps {
  menus: any[];
  onAddMenu: (newMenu: any) => void;
  onDeleteMenu: (menuId: string) => void;
  onAddSubmenu: (parentMenuId: string, newSubmenu: any) => void;
  onDeleteSubmenu: (parentMenuId: string, submenuId: string) => void;
}

function AdminPanel({
  menus,
  onAddMenu,
  onDeleteMenu,
  onAddSubmenu,
  onDeleteSubmenu,
}: AdminPanelProps) {
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isAddSubmenuModalOpen, setIsAddSubmenuModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleDeleteMenuClick = (menuId: string) =>
    setItemToDelete({
      type: "menu",
      id: menuId,
      name: menus.find((m) => m.id === menuId)?.name,
    });
  const handleDeleteSubmenuClick = (
    parentMenuId: string,
    submenuId: string
  ) => {
    const parentMenu = menus.find((m) => m.id === parentMenuId);
    const submenuName = parentMenu?.submenus.find(
      (s: any) => s.id === submenuId
    )?.name;
    setItemToDelete({
      type: "submenu",
      parentId: parentMenuId,
      id: submenuId,
      name: submenuName,
    });
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === "menu") onDeleteMenu(itemToDelete.id);
      else if (itemToDelete.type === "submenu")
        onDeleteSubmenu(itemToDelete.parentId, itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => setItemToDelete(null);

  const sortedMenus = sortMenus(menus);

  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <div className="sidebar">Dashboard</div>

      {/* Main content */}
      <div className="main-content">
        <h2 className="main-title">Menu Management Admin Panel</h2>

        <div className="button-group">
          <button
            onClick={() => setIsAddMenuModalOpen(true)}
            className="btn-add-menu"
          >
            + Add Menu
          </button>
          <button
            onClick={() => setIsAddSubmenuModalOpen(true)}
            className="btn-add-submenu"
          >
            + Add Submenu
          </button>
        </div>

        {/* Modals */}
        {isAddMenuModalOpen && (
          <div className="modal-positioner">
            <AddMenuModal
              onClose={() => setIsAddMenuModalOpen(false)}
              onAdd={onAddMenu}
            />
          </div>
        )}
        {isAddSubmenuModalOpen && (
          <div className="modal-positioner">
            <AddSubmenuModal
              onClose={() => setIsAddSubmenuModalOpen(false)}
              onAdd={onAddSubmenu}
              menus={menus}
            />
          </div>
        )}
        {itemToDelete && (
          <div className="modal-positioner">
            <DeleteConfirmationModal
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
              message={`Are you sure you want to delete the "${itemToDelete.name}" ${itemToDelete.type}?`}
            />
          </div>
        )}

        {/* Menu List */}
        <div className="menu-list-container">
          <h2 className="list-title">Existing Menus</h2>

          {sortedMenus.length > 0 ? (
            <div className="menu-list">
              {sortedMenus.map((menu) => (
                <div key={menu.id} className="menu-item">
                  <div className="menu-header">
                    <div className="menu-info">
                      <span className="menu-name">{menu.name}</span>
                      <span className="menu-path">{menu.path}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteMenuClick(menu.id)}
                      className="btn-delete-menu"
                    >
                      Delete Menu
                    </button>
                  </div>

                  {/* Submenus */}
                  {menu.submenus && menu.submenus.length > 0 && (
                    <ul className="submenu-list">
                      {sortMenus(menu.submenus).map((submenu: any) => (
                        <li key={submenu.id} className="submenu-item">
                          <span>
                            {submenu.name}{" "}
                            <span className="submenu-path">
                              ({submenu.path})
                            </span>
                          </span>
                          <button
                            onClick={() =>
                              handleDeleteSubmenuClick(menu.id, submenu.id)
                            }
                            className="btn-delete-submenu"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-list-message">
              No menus found. Please add one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
