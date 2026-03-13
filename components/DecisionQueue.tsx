"use client";

const DEMO_DECISIONS = [
  {
    id: "d1",
    num: 1,
    title: "Vælg farvepalet",
    description: "3 paletter er klar til din vurdering",
    actionLabel: "Se valgmuligheder",
  },
  {
    id: "d2",
    num: 2,
    title: "Godkend budgetoverslag",
    description: "Tillægsopgave på website: 4.800 kr.",
    actionLabel: "Gennemgå budget",
  },
  {
    id: "d3",
    num: 3,
    title: "Bekræft fotoshoot dato",
    description: "Foreslået: torsdag 19. marts kl. 10:00",
    actionLabel: "Bekræft dato",
  },
];

export default function DecisionQueue() {
  return (
    <div className="decision-queue">
      <div className="decision-queue-header">
        <span className="decision-queue-title">Vi har brug for dit valg her</span>
        <span className="decision-queue-count">{DEMO_DECISIONS.length}</span>
      </div>
      <div className="decision-queue-grid">
        {DEMO_DECISIONS.map((item) => (
          <div key={item.id} className="decision-queue-item">
            <div className="decision-queue-item-num">{item.num}</div>
            <div className="decision-queue-item-body">
              <span className="decision-queue-item-title">{item.title}</span>
              <span className="decision-queue-item-desc">{item.description}</span>
            </div>
            <button className="decision-queue-item-action">
              {item.actionLabel} &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
