import styles from "./Header.module.css";

const AccessibilityNavbar: React.FC = () => {
  const handleScreenReader = () => {
    document.body.setAttribute("aria-live", "polite");
    alert("Screen reader mode activated");
  };

  const handleSkipToMain = () => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSkipToNavigation = () => {
    const navigation =
      document.querySelector('nav[id="navigation"]') ||
      document.querySelector(".main-navigation");
    if (navigation) {
      navigation.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTextSizeIncrease = () => {
    const currentSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    document.documentElement.style.fontSize = `${Math.min(
      currentSize + 2,
      24
    )}px`;
  };

  const handleTextSizeDecrease = () => {
    const currentSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    document.documentElement.style.fontSize = `${Math.max(
      currentSize - 2,
      12
    )}px`;
  };

  const handleLanguageChange = (language: "hindi" | "english") => {
    console.log(`Language changed to: ${language}`);
  };

  return (
    <nav className={styles.accessibilityNavbar}>
      <div className={styles.accessibilityContent}>
        <button
          onClick={handleScreenReader}
          className={styles.accessibilityButton}
        >
          Screen Reader
        </button>
        <span className={styles.accessibilitySeparator}>|</span>
        <button
          onClick={handleSkipToMain}
          className={styles.accessibilityButton}
        >
          Skip to Main
        </button>
        <span className={styles.accessibilitySeparator}>|</span>
        <button
          onClick={handleSkipToNavigation}
          className={styles.accessibilityButton}
        >
          Skip to Navigation
        </button>
        <span className={styles.accessibilitySeparator}>|</span>
        <div className={styles.textSizeContainer}>
          <span className={styles.accessibilityButton}>Text Size</span>
          <button
            onClick={handleTextSizeIncrease}
            className={styles.accessibilityButton}
          >
            A+
          </button>
          <button
            onClick={handleTextSizeDecrease}
            className={styles.accessibilityButton}
          >
            A-
          </button>
        </div>
        <span className={styles.accessibilitySeparator}>|</span>
        <button
          onClick={() => handleLanguageChange("hindi")}
          className={styles.accessibilityButton}
        >
          हिंदी
        </button>
        <span className={styles.accessibilitySeparator}>|</span>
        <button
          onClick={() => handleLanguageChange("english")}
          className={styles.accessibilityButton}
        >
          English
        </button>
      </div>
    </nav>
  );
};

export default AccessibilityNavbar;
