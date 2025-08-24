import Button from "../../components/Button";
import Slider from "../../components/Slider";
import VideoPlayer from "../../components/VideoPlayer";
import { useGetNoticeQuery } from "../../store/services/opportunities.api";
import { useGetQuickMenuQuery } from "../../store/services/quickMenu.api";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";
import styles from "./home.module.css";

const Home = () => {
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
                {noticeData.data.map((item: IOpportunity, index: number) => (
                  <div className={styles.newsItem} key={index}>
                    <strong className={styles.newsDate}>
                      {item.createdOn ? formatDate(item.createdOn) : "N/A"}
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
