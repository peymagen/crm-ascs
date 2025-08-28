import React from "react";
import styles from "./dashboard.module.css";
import { useGetListpageQuery } from "../../../store/services/listpage.api";
import { useGetOpportunitiesQuery } from "../../../store/services/opportunities.api";
// import "chart.js/auto";

interface CardItem {
  title: string;
  count: number | string;
  color: string;
}

const Dashboard: React.FC = () => {
  const { data: listpageData } = useGetListpageQuery({
    limit: 0,
    offset: 0,
    search: "",
  });
  console.log("page", listpageData);
  const { data: opportunitiesData } = useGetOpportunitiesQuery({
    limit: 2000000,
    offset: 0,
    search: "",
  });
  const tenderTotal = opportunitiesData?.data?.filter(
    (d: IOpportunity) => d.type === "TENDERS"
  ).length;
  const vacancieTotal = opportunitiesData?.data?.filter(
    (d: IOpportunity) => d.type === "VACANCIES"
  ).length;
  console.log("OPPORTUNITY", tenderTotal, vacancieTotal);
  const cardData: CardItem[] = [
    {
      title: "Pages",
      count: listpageData?.total ?? 0,
      color: styles.lightBlue,
    },
    { title: "Tenders", count: tenderTotal ?? 0, color: styles.green },
    { title: "Vaccancies", count: vacancieTotal ?? 0, color: styles.yellow },
  ];
  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Dashboard</h2>
      <div className={styles.cardGrid}>
        {cardData.map((card, index) => (
          <div key={index} className={`${styles.card} ${card.color}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardCount}>{card.count}</h3>
                <p className={styles.cardTitle}>{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
