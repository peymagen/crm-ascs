import React from "react";
import "./Dashboard.css";
import { FileText, BarChart3, Users } from "lucide-react";

interface CardItem {
  title: string;
  count: number | string;
  color: string;
  icon: React.ReactNode;
}

const cardData: CardItem[] = [
  {
    title: "Pages",
    count: 150,
    color: "bg-light-blue",
    icon: <FileText size={28} />,
  },
  {
    title: "Tenders",
    count: "53%",
    color: "bg-green",
    icon: <BarChart3 size={28} />,
  },
  {
    title: "News",
    count: 44,
    color: "bg-yellow",
    icon: <Users size={28} />,
  },
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
              <div className="card-icon">
                {card.icon}
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