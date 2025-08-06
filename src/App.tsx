import { useState } from "react";

const langData = {
  en: {
    btns: [
      "HIV/AIDS Module for Complaints Officer",
      "Operational Research & Evaluation",
      "Right to Information Act",
      "Download ORW Modules",
      "Download PE Module",
      "HIV/AIDS Act",
      "Right to Services Act",
      "Public Grievances",
      "HIV/AIDS Control & Prevention Act"
    ],
    newsTitle: "News & Updates",
    news: [
      "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄",
      "Public Notice: Invitation for Comments on Revised Draft CRI Guidelines 2025, Version 2.0 📄"
    ],
    rss: "📡 RSS Feeds",
    viewAll: "View All ➤",
    contentTitle: "Content",
    content: [
      "Chandigarh State AIDS Control Society (CSACS) was registered in 1998...",
      "During NACP I (1992–1999) the stress was on awareness generation...",
      "The particulars of facilities available to citizens for obtaining information...",
      "E-mail id of CSACS:- chandigarhsacs@gmail.com"
    ]
  },
  hi: {
    btns: [
      "शिकायत अधिकारी के लिए एचआईवी/एड्स मॉड्यूल",
      "ऑपरेशनल रिसर्च और मूल्यांकन",
      "सूचना का अधिकार अधिनियम",
      "ORW मॉड्यूल डाउनलोड करें",
      "PE मॉड्यूल डाउनलोड करें",
      "एचआईवी/एड्स अधिनियम",
      "सेवा का अधिकार अधिनियम",
      "सार्वजनिक शिकायतें",
      "एचआईवी/एड्स नियंत्रण और रोकथाम अधिनियम"
    ],
    newsTitle: "समाचार और अपडेट",
    news: [
      "जन सूचना: मसौदा CRI दिशानिर्देशों पर टिप्पणियों के लिए निमंत्रण, संस्करण 2.0 📄",
      "जन सूचना: मसौदा CRI दिशानिर्देशों पर टिप्पणियों के लिए निमंत्रण, संस्करण 2.0 📄",
      "जन सूचना: मसौदा CRI दिशानिर्देशों पर टिप्पणियों के लिए निमंत्रण, संस्करण 2.0 📄"
    ],
    rss: "📡 आरएसएस फ़ीड",
    viewAll: "सभी देखें ➤",
    contentTitle: "विवरण",
    content: [
      "चंडीगढ़ राज्य एड्स नियंत्रण समिति (CSACS) की स्थापना 1998 में की गई थी...",
      "NACP I (1992–1999) के दौरान जोर जनसंख्या में जागरूकता पैदा करने पर था...",
      "नागरिकों को सूचना प्राप्त करने के लिए उपलब्ध सुविधाओं का विवरण...",
      "CSACS की ईमेल आईडी:- chandigarhsacs@gmail.com"
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  const data = langData[lang];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex flex-wrap justify-center gap-2 p-4 bg-white relative">
        {data.btns.map((text, i) => (
          <button key={i} className="bg-red-800 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700">
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
          {data.news.map((n, i) => (
            <div key={i} className="border-b border-dashed border-gray-400 pb-2 mb-2 text-sm">
              <small className="text-gray-500 block">26–Jun–2025</small>
              {n}
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
        {data.content.map((p, i) => (
          <p key={i} className="text-sm mb-2">{p}</p>
        ))}
      </div>
    </div>
  );
}
