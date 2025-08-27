import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetFaqQuery } from "../../store/services/faq.api";
import styles from "./FAQ.module.css";

const FAQ: React.FC<{ count?: number }> = ({ count = 10000 }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const {
    data: faqResponse,
    isLoading,
    isError,
    error,
  } = useGetFaqQuery({ limit: count, offset: 0 });

  // Transform API response to match our IFAQ interface
  const faqData: IFAQ[] = React.useMemo(() => {
    if (!faqResponse) return [];

    let items: IFAQ[] = [];

    if (Array.isArray(faqResponse.data)) {
      items = faqResponse.data;
    } else if (Array.isArray(faqResponse)) {
      items = faqResponse;
    } else if (faqResponse.data && typeof faqResponse.data === "object") {
      items = [faqResponse.data];
    }

    return items.filter(
      (item: IFAQ) => item.status === undefined || item.status === 1
    );
  }, [faqResponse]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <p className={styles.subtitle}>
              Get answers to common questions about our services
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              fontSize: "1.1rem",
              color: "var(--primary-color)",
            }}
          >
            Loading FAQs...
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    let errorMessage = "Unknown error";

    console.error("FAQ API Error:", error);

    if (error && "data" in error && error.data) {
      const errData = error.data as { message?: string };
      if (typeof errData === "string") {
        errorMessage = errData;
      } else if (errData.message) {
        errorMessage = errData.message;
      } else {
        errorMessage = JSON.stringify(errData);
      }
    } else if (error && "error" in error) {
      errorMessage = error.error;
    }

    return (
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <p className={styles.subtitle}>
              Get answers to common questions about our services
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              fontSize: "1.1rem",
              color: "#e74c3c",
            }}
          >
            Error loading FAQs: {errorMessage}
          </div>
        </div>
      </section>
    );
  }

  // No FAQs state
  if (faqData.length === 0) {
    return (
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <p className={styles.subtitle}>
              Get answers to common questions about our services
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              fontSize: "1.1rem",
              color: "var(--primary-color)",
            }}
          >
            No FAQs available at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className={styles.header}
        >
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Get answers to common questions about our services
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              className={styles.faqItem}
            >
              <button
                className={`${styles.questionButton} ${
                  openItems.includes(item.id ?? 0) ? styles.active : ""
                }`}
                onClick={() => toggleItem(item.id ?? 0)}
                aria-expanded={openItems.includes(item.id ?? 0)}
              >
                <span className={styles.questionText}>{item.question}</span>
                <motion.span
                  className={styles.icon}
                  animate={{
                    rotate: openItems.includes(item.id ?? 0) ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {openItems.includes(item.id ?? 0) && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={styles.answerContainer}
                  >
                    <div className={styles.answerContent}>
                      <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
