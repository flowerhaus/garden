"use client";

import { Card, CardBody } from "@heroui/react";

const DEMO_ITEMS = [
  { id: "mb1", title: "Logo koncept A", category: "Branding", seed: "logo-a" },
  { id: "mb2", title: "Logo koncept B", category: "Branding", seed: "logo-b" },
  { id: "mb3", title: "Forside mockup", category: "Webdesign", seed: "homepage" },
  { id: "mb4", title: "Produktside layout", category: "Webdesign", seed: "product" },
  { id: "mb5", title: "Farvepalet udkast", category: "Farver", seed: "colors" },
  { id: "mb6", title: "Typografi oversigt", category: "Branding", seed: "typo" },
];

export default function Moodboard() {
  return (
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-default-500">Moodboard</span>
          <span className="text-[11px] font-semibold text-default-500">{DEMO_ITEMS.length} udkast</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-sm:grid-cols-2 gap-2.5">
          {DEMO_ITEMS.map((item) => (
            <div key={item.id} className="cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full aspect-[4/3] object-cover rounded-medium block"
                src={`https://picsum.photos/seed/${item.seed}/400/300`}
                alt={item.title}
                loading="lazy"
              />
              <div className="px-0.5 pt-1.5">
                <span className="block text-xs font-medium text-foreground">{item.title}</span>
                <span className="block text-[10px] text-default-500 mt-px">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
