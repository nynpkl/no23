import { useState } from "react";
import matches from "./matches";

export default function App() {
  const [seasonFilter, setSeasonFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateResetKey, setDateResetKey] = useState(0);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR");
  };

  const filtered = matches
    .filter((m) => {
      const matchDate = new Date(m.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (seasonFilter === "All" || m.season === seasonFilter) &&
        (ageFilter === "All" || m.age === ageFilter) &&
        (leagueFilter === "All" || m.league === leagueFilter) &&
        (resultFilter === "All" || m.result === resultFilter) &&
        (!start || matchDate >= start) &&
        (!end || matchDate <= end)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #ffffff;
          color: #111111;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        }

        .page {
          max-width: 920px;
          margin: 0 auto;
          padding: 28px 18px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 18px;
          margin-bottom: 20px;
        }

        .kicker {
          color: #777777;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .title {
          margin: 0;
          font-size: 38px;
          line-height: 1.05;
          letter-spacing: -1px;
        }

        .count {
          background: #f7efc6;
          border: 1px solid #eadb98;
          padding: 7px 12px;
          border-radius: 999px;
          font-weight: 700;
          white-space: nowrap;
          font-size: 14px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .select,
        .dateGroup {
          height: 38px;
          border: 1px solid #dddddd;
          border-radius: 10px;
          background: #ffffff;
          padding: 0 11px;
          font-size: 14px;
        }

        .dateGroup {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fafafa;
        }

        .dateLabel {
          color: #666666;
          font-weight: 700;
          font-size: 13px;
        }

        .dateInput {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          width: 120px;
        }

        .clearBtn {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #999999;
          font-size: 13px;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .card {
          border: 1px solid #eeeeee;
          border-radius: 14px;
          padding: 14px;
          background: #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
        }

        .cardTop {
          display: flex;
          gap: 7px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 7px;
          font-size: 13px;
        }

        .badge {
          background: #f6e9ad;
          border-radius: 7px;
          padding: 3px 7px;
          font-weight: 700;
          color: #111111;
        }

        .meta {
          color: #777777;
          font-weight: 600;
        }

        .win {
          color: #118000;
          font-weight: 700;
        }

        .lose {
          color: #c40000;
          font-weight: 700;
        }

        .cardMain {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: center;
        }

        .match {
          font-size: 21px;
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.3px;
        }

        .vs {
          color: #777777;
          font-weight: 700;
        }

        .sub {
          margin-top: 4px;
          color: #666666;
          font-size: 14px;
        }

        .actions {
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          padding: 0 12px;
          border-radius: 9px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .video {
          background: #111111;
          color: #ffffff;
        }

        .highlights {
          background: #f6e9ad;
          color: #111111;
        }

        .stats {
          background: #ffffff;
          color: #111111;
          border: 1px solid #dddddd;
        }

        @media (max-width: 640px) {
          .page {
            padding: 22px 14px;
          }

          .header {
            align-items: flex-start;
          }

          .title {
            font-size: 34px;
          }

          .select {
            flex: 1 1 calc(50% - 8px);
            min-width: 130px;
          }

          .dateGroup {
            width: 100%;
            height: auto;
            min-height: 42px;
            flex-wrap: wrap;
            padding: 8px 10px;
          }

          .dateInput {
            width: 125px;
          }

          .card {
            padding: 13px;
          }

          .cardMain {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .match {
            font-size: 20px;
          }

          .actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 7px;
          }

          .btn {
            width: 100%;
            padding: 0 8px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="page">
        <header className="header">
          <div>
            <div className="kicker">No23 Basketball Academy</div>
            <h1 className="title">Match Archive</h1>
          </div>
          <div className="count">{filtered.length} maç</div>
        </header>

        <div className="filters">
          <select className="select" onChange={(e) => setSeasonFilter(e.target.value)}>
            <option value="All">Sezon</option>
            <option>2025-2026</option>
            <option>2026-2027</option>
          </select>

          <select className="select" onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="All">Yaş</option>
            <option>U8</option>
            <option>U9</option>
            <option>U10</option>
            <option>U11</option>
            <option>U12</option>
          </select>

          <select className="select" onChange={(e) => setLeagueFilter(e.target.value)}>
            <option value="All">Lig</option>
            <option>Unibest</option>
            <option>Gelişim</option>
            <option>TBF</option>
          </select>

          <select className="select" onChange={(e) => setResultFilter(e.target.value)}>
            <option value="All">Sonuç</option>
            <option>Galibiyet</option>
            <option>Mağlubiyet</option>
          </select>

          <div className="dateGroup">
            <span className="dateLabel">Tarih</span>

            <input
              key={`start-${dateResetKey}`}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="dateInput"
            />

            <span>–</span>

            <input
              key={`end-${dateResetKey}`}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="dateInput"
            />

            {(startDate || endDate) && (
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setDateResetKey((prev) => prev + 1);
                }}
                className="clearBtn"
                title="Tarih filtresini temizle"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="list">
          {filtered.map((m) => (
            <div key={m.id} className="card">
              <div className="cardTop">
                <span className="badge">{m.season}</span>
                <span className="badge">{m.age}</span>
                <span className="meta">{m.league}</span>
                <span className={m.result === "Galibiyet" ? "win" : "lose"}>
                  {m.result}
                </span>
              </div>

              <div className="cardMain">
                <div>
                  <div className="match">
                    No23 Basketball Academy <span className="vs">vs</span> {m.opponent}
                  </div>
                  <div className="sub">
                    {formatDate(m.date)} · Skor: {m.score}
                  </div>
                </div>

                <div className="actions">
  {m.video && (
    <a href={m.video} target="_blank" rel="noreferrer" className="btn video">
      Video
    </a>
  )}

  {m.highlights && (
    <a href={m.highlights} target="_blank" rel="noreferrer" className="btn highlights">
      Highlights
    </a>
  )}

  {m.stats && (
    <a href={m.stats} target="_blank" rel="noreferrer" className="btn stats">
      Stats
    </a>
  )}
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
