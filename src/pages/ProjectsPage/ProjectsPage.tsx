import { Link, useParams } from "react-router-dom";
import styles from "./ProjectsPage.module.css";
import { useGetListpageBySlugQuery } from "../../store/services/listpage.api";
import { useGetMainMenuBySlugQuery } from "../../store/services/mainMenu.api";

const ProjectsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetListpageBySlugQuery(String(id));
  const { data: mainMenuData, isLoading: mainMenuLoading } =
    useGetMainMenuBySlugQuery(String(id));

  return (
    <div className={styles.container}>
      {/* Left Column - Projects */}
      {!mainMenuLoading && mainMenuData?.data?.subMenu.length > 0 && (
        <div className={styles.leftColumn}>
          <h1 className={styles.mainTitle}>{mainMenuData?.data?.name}</h1>
          <ul className={styles.projectList}>
            {mainMenuData?.data?.subMenu?.map((project: ISubMenu) => (
              <li key={project.id} className={styles.projectItem}>
                <Link to={`/${project.url}`} className={styles.projectLink}>
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Right Column - SOPs */}
      {!isLoading && (
        <div className={styles.rightColumn}>
          <h2 className={styles.sectionTitle}>{data?.data?.title || ""}</h2>
          {data?.data?.image && (
            <img
              src={import.meta.env.VITE_BACKEND_SERVER + data?.data?.image}
              alt={data?.data?.title || "Project Image"}
            />
          )}
          {data?.data?.description ? (
            <div
              className={styles.divBody}
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            />
          ) : (
            "No Page Found"
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
