import { useState } from "react";
import csacsData from "./csacs.json";

type LangType = "en" | "hi";

const App = () => {
  const [lang, setLang] = useState<LangType>("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  const data = csacsData.translations[lang];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex flex-wrap justify-center gap-2 p-4 bg-white relative">
        {data.buttons.map((text: string, i: number) => (
          <button
            key={i}
            className="bg-red-800 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700"
          >
            {text}
          </button>
        ))}
        <button
          onClick={toggleLang}
          className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded"
        >
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </header>

      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex-1 min-w-[300px] bg-red-50 p-4 rounded">
          <h2 className="text-red-800 font-semibold text-lg mb-4">{data.newsTitle}</h2>
          {data.newsItems.map((item: any, i: number) => (
            <div
              key={i}
              className="border-b border-dashed border-gray-400 pb-2 mb-2 text-sm"
            >
              <small className="text-gray-500 block">{item.date}</small>
              {item.text}
            </div>
          ))}
          <div className="flex justify-between text-red-800 text-sm mt-2">
            <span>{data.rss}</span>
            <span>{data.viewAll}</span>
          </div>
        </div>

        <div className="flex-1 min-w-[300px] bg-black text-white p-2 rounded flex justify-center items-center">
          <video controls className="w-full rounded">
            <source src="sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="bg-white m-4 p-4 rounded shadow">
        <h2 className="text-red-800 font-semibold text-lg mb-4">{data.contentTitle}</h2>
        {data.paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-sm mb-2">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
