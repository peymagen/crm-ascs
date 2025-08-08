import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import en from '../../i18n/en.json';
import hi from '../../i18n/hi.json';

// Import modular components
import VideoPlayer from '../../components/VideoPlayer';
import Button from '../../components/Button';
import Header from '../../components/Header';

// Define types for type-safety
interface NewsItem {
  date: string;
  text: string;
}

interface TranslationData {
  buttons: string[];
  newsTitle: string;
  newsItems: NewsItem[];
  rss: string;
  viewAll: string;
  contentTitle: string;
  paragraphs: string[];
}
type LangKey = 'en' | 'hi';
const translations: Record<LangKey, TranslationData> = { en, hi };

const HomePage: React.FC = () => {
  const [lang, setLang] = useState<LangKey>('en');
  const data = translations[lang];

  return (
    <div className={styles.homePage}>
      {/* Header Section */}
      <Header buttons={data.buttons} />

      <div className={styles.languageSwitcher}>
        <Button
          title="English"
          onClick={() => setLang('en')}
          buttonType="secondary"
          disabled={lang === 'en'}
        />
        <Button
          title="हिन्दी"
          onClick={() => setLang('hi')}
          buttonType="secondary"
          disabled={lang === 'hi'}
        />
      </div>

      <main className={styles.mainContent}>
        {/* News Card Section */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{data.newsTitle}</h2>
          <div className={styles.newsItemsContainer}>
            {data.newsItems.map((item, index) => (
              <div className={styles.newsItem} key={index}>
                <strong className={styles.newsDate}>{item.date}</strong>
                <p className={styles.newsText}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.newsFooter}>
            <a href="#" className={styles.footerLink}>{data.rss}</a>
            <a href="#" className={styles.footerLink}>{data.viewAll}</a>
          </div>
        </div>

        {/* Video Player Section */}
        <VideoPlayer videoId="M7lc1UVf-VE" />
      </main>

      {/* Content Section */}
      <div className={styles.contentCard}>
        <h2 className={styles.cardTitle}>{data.contentTitle}</h2>
        {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
};

export default HomePage;