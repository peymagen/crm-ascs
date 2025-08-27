import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FAQ from "../../components/FAQ";
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

  const navigate = useNavigate();

  const { data: noticeData, isLoading: noticeLoading } = useGetNoticeQuery({});

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  const handleRedirect = (url: string, othet_url: string, target = "_self") => {
    const aUrl = url.length > 2 ? url : othet_url;
    if (!aUrl) return;

    const isExternal = aUrl.startsWith("http"); // detect internal route

    if (!isExternal) {
      if (target === "_blank") {
        window.open(
          window.location.origin + aUrl,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        navigate(aUrl); // React Router navigation
      }
    } else {
      if (target === "_blank") {
        window.open(aUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = aUrl;
      }
    }
  };

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
                buttonType="secondaryFill"
                onClick={() =>
                  handleRedirect(d.url ?? "", d.other_url ?? "", d.target)
                }
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.mainContent}>
          {!noticeLoading && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Notice & Latest Updates</h2>
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

        <div
          className={styles.contentCard}
          dangerouslySetInnerHTML={{
            __html: contentData?.data.content,
          }}
        />
        <FAQ count={5} />
      </div>
    </div>
  );
};

export default Home;
