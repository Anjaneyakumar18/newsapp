import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("News");

  const API_KEY ="4850e40218224e68856cfa1150ba64bd";

  async function fetchNews(q = "apple") {
    setLoading(true);
    setError("");
    setArticles([]);

    const from = "2025-08-19";
    const to = "2025-08-19";
    const sortBy = "popularity";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&from=${from}&to=${to}&sortBy=${sortBy}`;

    try {
      const res = await fetch(url, {
        headers: { "X-Api-Key": API_KEY },
      });

      // If the plan blocks browser requests, you'll see an error JSON with status "error"
      const data = await res.json();

      if (!res.ok || data.status === "error") {
        // Use message from API if available
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      setArticles(data.articles || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.message ||
          "Failed to fetch news. If you're on a Developer plan and not running from http://localhost, NewsAPI may block browser requests."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(query);
  }, []);

  function onSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    fetchNews(query.trim());
  }

  return (
    <>
    <div className="head">
        <h1>News-App searching for - {query} </h1>
    </div>
    <div className="news-page">
      <header className="news-header">


        <form className="search-form" onSubmit={onSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keyword (e.g. apple, tesla)"
            aria-label="search"
          />
          <button type="submit">Search</button>
        </form>


      </header>

      <main className="news-main">
        {loading && <div className="status">Loading articles…</div>}

        {error && <div className="status error">Error: {error}</div>}

        {!loading && !error && articles.length === 0 && (
          <div className="status">No articles found for this query/date.</div>
        )}

        <section className="articles-grid">
          {articles.map((a, i) => (
            <article key={i} className="card">
              <div className="thumb-wrap">
                <img
                  src={a.urlToImage || "https://via.placeholder.com/640x360?text=No+Image"}
                  alt={a.title || "thumbnail"}
                  className="thumb"
                />
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  <a href={a.url} target="_blank" rel="noopener noreferrer">
                    {a.title}
                  </a>
                </h2>

                <div className="meta">
                  <span className="source">{a.source?.name || "Unknown"}</span>
                  <span>•</span>
                  <span className="author">{a.author || "Unknown author"}</span>
                  <span>•</span>
                  <time className="date">
                    {a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ""}
                  </time>
                </div>

                <p className="desc">{a.description || a.content || "No description available."}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
    </>
  );
}
