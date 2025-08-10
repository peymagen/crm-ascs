import React from 'react';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  return (
    <div className={styles.container}>
      {/* Left Column - Projects */}
      <div className={styles.leftColumn}>
        <h1 className={styles.mainTitle}>Projects</h1>
        <ul className={styles.projectList}>
          <li>National Hydrology Project (NHP)</li>
          <li>SVAMITVA</li>
          <li>National Mission for Clean Ganga (NMCG)</li>
          <li>National GCP Library</li>
          <li>Redefinition of Indian Vertical Datum</li>
          <li>Web GIS based governance application for NDMA</li>
          <li>High Precision Levelling</li>
          <li className={styles.active}>Continuously Operating Reference Stations (CORS)</li>
          <li>Salt Pan Land Survey</li>
          <li>Naksha</li>
        </ul>
      </div>

      {/* Right Column - SOPs */}
      <div className={styles.rightColumn}>
        <h2 className={styles.sectionTitle}>Standard Operating Procedures (SOPs)</h2>
        <ol className={styles.procedureList}>
          <li>CORS Registration and Data Downloading rer (rouana)</li>
          <li>DGNSS–Survey Using CORS Network rer (cava)</li>
          <li>NRTK–Survey rer (exa va)</li>
          <li>NRTK–Survey–Continuous Topo rer (xazwa)</li>
          <li>Online Post Processing Using CORS Network rer (zzzzva)</li>
          <li>VRS Data Downloading rer (vauara)</li>
        </ol>

        <div className={styles.guidelines}>
          <p>Guidelines for Network RTK Survey rer (zauara)</p>
          <p>CORS Registration Form rer (xauara)</p>
          <p>Note on RTK and CORS rer (zauara)</p>
        </div>

        <div className={styles.footer}>
          <p>CORS Users can click on the given link for more information on CORS Web Application</p>
          <a href="https://cors.surveyofindia.gov.in/" target="_blank" rel="noopener noreferrer">
            https://cors.surveyofindia.gov.in/
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
