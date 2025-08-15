import Button from "../../components/Button";
import Slider from "../../components/Slider";
import VideoPlayer from "../../components/VideoPlayer";
import { useGetNoticeQuery } from "../../store/services/opportunities.api";
import { useGetQuickMenuQuery } from "../../store/services/quickMenu.api";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";
import styles from "./home.module.css";

const Home = () => {
  const data = {
    buttons: [
      "HIV/AIDS Module for Complaints Officer",
      "Operational Research & Evaluation",
      "Right to Information Act",
      "Download ORW Modules",
      "Download PE Module",
      "HIV/AIDS Act",
      "Right to Services Act",
      "Public Grievances",
      "HIV/AIDS Control & Prevention Act",
    ],
    newsTitle: "News & Updates",
    newsItems: [
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
      {
        date: "26-Jun-2025",
        text: "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      },
    ],
    rss: "📡 RSS Feeds",
    viewAll: "View All ➤",
    contentTitle: "Content",
    paragraphs: [
      "Chandigarh State AIDS Control Society (CSACS) was registered in 1998...",
      "During NACP I (1992–1999) the stress was on awareness generation...",
      "The particulars of facilities available to citizens for obtaining information...",
      "E-mail id of CSACS:- chandigarhsacs@gmail.com",
    ],
  };

  const { data: quickLinks, isLoading: isQuickLinksLoading } =
    useGetQuickMenuQuery({});
  const { data: contentData, isLoading: contentLoading } =
    useGetSettingByIdQuery(1);

  const { data: noticeData, isLoading: noticeLoading } = useGetNoticeQuery({});

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div>
      <Slider />
      {/* Other components can be added here */}
      {!isQuickLinksLoading && (
        <div className={styles.btnContainer}>
          <div className={`${styles.headerNav} `}>
            {quickLinks.data.map((d: IMainMenu) => (
              <Button
                type="button"
                key={d.id}
                title={d.name}
                buttonType="primary"
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.mainContent}>
          {!noticeLoading && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Notice</h2>
              <div className={styles.newsItemsContainer}>
                {noticeData.data.map((item, index) => (
                  <div className={styles.newsItem} key={index}>
                    <strong className={styles.newsDate}>
                      {formatDate(item.createdOn)}
                    </strong>
                    <p className={styles.newsText}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Player Section */}
          <VideoPlayer
            isLoading={contentLoading}
            videoUrl={contentData?.data.videoUrl}
          />
        </div>
        <div className={styles.contentCard}>{contentData?.data.content}</div>
      </div>
    </div>
  );
};

export default Home;
