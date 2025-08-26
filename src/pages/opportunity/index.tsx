import { motion } from "framer-motion";
import styles from "./opportunity.module.css";
import { Link, useParams } from "react-router-dom";
import { useGetOpportunityTypeQuery } from "../../store/services/opportunities.api";

const Opportunity = () => {
  const { type } = useParams();
  const { data, isLoading } = useGetOpportunityTypeQuery(type?.toUpperCase());
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.galleryHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.galleryTitle}>{type?.toUpperCase()}:</h1>
      </motion.div>
      {!isLoading && (
        <div className={styles.links}>
          {data.data.map((data: IOpportunity) => (
            <Link
              to={import.meta.env.VITE_BACKEND_SERVER + data.file_url}
              target="_blank"
            >
              {data.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunity;
