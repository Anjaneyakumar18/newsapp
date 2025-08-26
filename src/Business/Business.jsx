import React, { useEffect, useState } from "react";
import "./Business.css";

export default function Business() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4850e40218224e68856cfa1150ba64bd"
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => console.error("Error fetching business news:", err));
  }, []);
    const toDate = new Date();
const fromDate = new Date();
fromDate.setMonth(fromDate.getMonth() - 1);

const formattedFrom = fromDate.toISOString().split("T")[0];
const formattedTo = toDate.toISOString().split("T")[0];

  return (
    <div className="business-container">
      <h2>Business News</h2>
      <div className="business-news">
        {articles.map((article, index) => (
          <div key={index} className="business-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="business-img"
              />
            )}
            <div className="business-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
