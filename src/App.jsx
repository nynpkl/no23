import { useState } from "react";

const matches = [
  {
    id: 1,
    date: "2026-05-01",
    age: "U10",
    league: "TBF",
    result: "Galibiyet",
    opponent: "Fatih Belediyesi",
    score: "42-30",
    video: "https://youtube.com",
    stats: "https://docs.google.com"
  },
  {
    id: 2,
    date: "2026-04-26",
    age: "U9",
    league: "Unibest",
    result: "Mağlubiyet",
    opponent: "Anka Avrupa",
    score: "28-35",
    video: "https://youtube.com",
    stats: "https://docs.google.com"
  }
];

export default function App() {
  const [ageFilter, setAgeFilter] = useState("All");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");

  const filtered = matches.filter((m) => {
    return (
      (ageFilter === "All" || m.age === ageFilter) &&
      (leagueFilter === "All" || m.league === leagueFilter) &&
      (resultFilter === "All" || m.result === resultFilter)
    );
  });

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>No23 Match Archive</h1>

      {/* FILTERS */}
      <div style={styles.filters}>
        <select onChange={(e) => setAgeFilter(e.target.value)} style={styles.select}>
          <option value="All">Yaş</option>
          <option>U8</option>
          <option>U9</option>
          <option>U10</option>
          <option>U11</option>
          <option>U12</option>
        </select>

        <select onChange={(e) => setLeagueFilter(e.target.value)} style={styles.select}>
          <option value="All">Lig</option>
          <option>Unibest</option>
          <option>Gelişim</option>
          <option>TBF</option>
        </select>

        <select onChange={(e) => setResultFilter(e.target.value)} style={styles.select}>
          <option value="All">Sonuç</option>
          <option>Galibiyet</option>
          <option>Mağlubiyet</option>
        </select>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {filtered.map((m) => (
          <div key={m.id} style={styles.row}>

            <div style={styles.left}>
              <div style={styles.topLine}>
                <span style={styles.badge}>{m.age}</span>
                <span style={styles.meta}>{m.league}</span>
                <span style={m.result === "Galibiyet" ? styles.win : styles.lose}>
                  {m.result}
                </span>
              </div>

              <div style={styles.match}>
                No23 vs {m.opponent}
              </div>

              <div style={styles.sub}>
                {m.date} • Skor: {m.score}
              </div>
            </div>

            <div style={styles.right}>
              <a href={m.video} target="_blank" style={styles.video}>
                Video
              </a>
              <a href={m.stats} target="_blank" style={styles.stats}>
                Stats
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#ffffff",
    color: "#111",
    minHeight: "100vh",
    fontFamily: "Arial",
    padding: 30,
    maxWidth: 900,
    margin: "0 auto"
  },

  title: {
    marginBottom: 20
  },

  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20
  },

  select: {
    padding: 8,
    border: "1px solid #ddd",
    borderRadius: 6
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 14
  },

  left: {},

  topLine: {
    display: "flex",
    gap: 8,
    marginBottom: 6,
    fontSize: 12
  },

  badge: {
    background: "#f4e7b2",
    padding: "2px 6px",
    borderRadius: 4
  },

  meta: {
    color: "#777"
  },

  win: {
    color: "green"
  },

  lose: {
    color: "red"
  },

  match: {
    fontWeight: "bold"
  },

  sub: {
    fontSize: 13,
    color: "#666"
  },

  right: {
    display: "flex",
    gap: 8
  },

  video: {
    background: "#111",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 12
  },

  stats: {
    border: "1px solid #ddd",
    padding: "6px 10px",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 12,
    color: "#111"
  }
};
