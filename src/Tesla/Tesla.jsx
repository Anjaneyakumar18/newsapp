import React, { useEffect, useState } from "react";
import "./Tesla.css";
import apikey from "../apikey"; // Import
export default function Tesla() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const APIKEY=apikey;
  const toDate = new Date();
const fromDate = new Date();
fromDate.setMonth(fromDate.getMonth() - 1);

const formattedFrom = fromDate.toISOString().split("T")[0];
const formattedTo = toDate.toISOString().split("T")[0];

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=tesla&from=${formattedFrom}&to=${formattedTo}&sortBy=publishedAt&apiKey=${APIKEY}`

    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading news...</h2>;
  }

  return (
  <div className="apple-container">
    <h1  id="applehead">News About Tesla</h1>

    {loading ? (
      <div className="apple-loading">Loading news...</div>
    ) : articles.length === 0 ? (
      <div className="apple-empty">No articles found.</div>
    ) : (
      <div className="articles-grid">
        {articles.map((article, i) => (
          <article key={i} className={`article-card ${!article.urlToImage ? 'article-noimage' : ''}`}>
            {article.urlToImage && (
              <img className="article-image" src={article.urlToImage} alt={article.title} />
            )}
            <div className="article-content">
              <h3 className="article-title">
                <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
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
