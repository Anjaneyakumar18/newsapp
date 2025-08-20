import React, { useEffect, useState } from "react";
import "./Tesla.css";

export default function Tesla() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2025-07-20&sortBy=publishedAt&apiKey=4850e40218224e68856cfa1150ba64bd"
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Tesla news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="tesla-container">
      <h1 className="tesla-heading">Tesla News</h1>
      {loading ? (
        <div className="tesla-loading">Loading news...</div>
      ) : articles.length === 0 ? (
        <div className="tesla-empty">No articles found.</div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className={`article-card ${
                !article.urlToImage ? "article-noimage" : ""
              }`}
            >
              {article.urlToImage && (
                <img
                  className="article-image"
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <div className="article-content">
                <h3 className="article-title">
                  <a href={article.url} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </h3>
                <div className="article-meta">
                  <span>{article.source?.name}</span>
                  <span>•</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleString()}
                  </span>
                </div>
                <p className="article-desc">{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
