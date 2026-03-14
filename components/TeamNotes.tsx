export default function TeamNotes() {
  const notes = [
    { text: "Husk: Leverandørmøde torsdag kl. 10", author: "Marie", date: "14. mar" },
    { text: "Printfiler klar til gennemsyn i Drive", author: "Anna", date: "13. mar" },
    { text: "Ny tidsplan sendt på mail", author: "Peter", date: "12. mar" },
  ];

  return (
    <div className="notes-section">
      <div className="notes-header">
        <h2 className="notes-title">Noter</h2>
      </div>
      <div className="notes-list">
        {notes.map((n, i) => (
          <div key={i} className="notes-item">
            <span className="notes-text">{n.text}</span>
            <span className="notes-meta">{n.author} &middot; {n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
