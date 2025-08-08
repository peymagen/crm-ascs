import React from "react";
import "./dashboard.css";
import "chart.js/auto";

interface CardItem {
  title: string;
  count: number | string;
  color: string;
}

const cardData: CardItem[] = [
  { title: "Pages", count: 150, color: "bg-light-blue" },
  { title: "Tenders", count: "53%", color: "bg-green" },
  { title: "News", count: 44, color: "bg-yellow" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="card-grid">
        {cardData.map((card, index) => (
          <div key={index} className={`card ${card.color}`}>
            <div className="card-content">
              <div className="card-info">
                <h3 className="card-count">{card.count}</h3>
                <p className="card-title">{card.title}</p>
              </div>
            </div>
            <div className="card-footer">
              <button className="more-info">More info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;