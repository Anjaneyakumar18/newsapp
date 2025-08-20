import React, { useEffect, useState } from "react";
import "./TechNews.css";

export default function TechNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4850e40218224e68856cfa1150ba64bd";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          setError(data.message || "Failed to fetch articles");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tech news:", err);
        setError("Unable to fetch tech news. Check console for details.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="tech-container">
      <h1 className="tech-heading">TechCrunch — Top Tech News</h1>

      {loading ? (
        <div className="tech-loading">Loading news...</div>
      ) : error ? (
        <div className="tech-empty">{error}</div>
      ) : articles.length === 0 ? (
        <div className="tech-empty">No articles found.</div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className={`article-card ${!article.urlToImage ? "article-noimage" : ""}`}
            >
              {article.urlToImage && (
                <img className="article-image" src={article.urlToImage} alt={article.title} />
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
                  <span>{new Date(article.publishedAt).toLocaleString()}</span>
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
