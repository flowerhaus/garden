"use client";

import { Card, CardBody, Badge, Button } from "@heroui/react";

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
    <Card className="mb-3 bg-[#f5ece7]" shadow="none">
      <CardBody className="p-5">
        <div className="flex items-center gap-2.5 mb-3.5">
          <span className="text-[15px] font-semibold text-foreground">Vi har brug for dit valg her</span>
          <Badge content={DEMO_DECISIONS.length} color="secondary" size="sm" shape="circle">
            <span />
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5">
          {DEMO_DECISIONS.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3.5 bg-white rounded-medium">
              <div className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                <span className="block text-xs text-default-500 mt-0.5">{item.description}</span>
              </div>
              <Button size="sm" color="primary" radius="full" className="shrink-0 mt-0.5 text-xs font-semibold">
                {item.actionLabel} &rarr;
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
