import React, { useState } from "react";
import { fetchNewsApi, newsoptions } from "../utils/fetchNewsApi";

function News() {
  const searchTerm = "CRYPTOCURRENCY";
  const [news, setNews] = useState(null);
  const getNews = async () => {
    const newsArray = await fetchNewsApi(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=%3C${searchTerm}%3E&freshness=Day&textFormat=Raw&safeSearch=Off`,
      newsoptions
    );
    setNews(newsArray.value);
  };
  getNews();
  if (news === undefined) return;
  if (news === null) return;
  
  function getTimeString(date) {
    const timeElapsed = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(timeElapsed / (1000 * 60));
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours}h ago`;
      } else {
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
      }
    }
  }

  return (
    <div className="flex flex-wrap -mx-2">
  {news.map((item, index) => {
    const timeString = getTimeString(item.datePublished);
    return (
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={index}>
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden relative shadow-md hover:shadow-lg transform transition-transform hover:scale-105">
          <div className="p-4">
            <h3 className="text-gray-800 text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-gray-600 text-sm flex items-center">
                <p className="mr-2">{item.provider.name}</p>
              </p>
            </div>
            <p className="text-gray-600 text-sm absolute bottom-4 right-4">
              {timeString}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

  );
}

export default News;
