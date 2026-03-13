"use client";

import { Card, CardBody, Avatar, Button } from "@heroui/react";

const CONTACTS = [
  { name: "Isabella Lewis", role: "Psychologist", phone: "+1 408 451 5925", avatar: "isabella" },
  { name: "Samuel Adamson", role: "Mathematics", phone: "+1 408 831 5372", avatar: "samuel" },
  { name: "Olivia Smith", role: "Art", phone: "+1 408 952 4284", avatar: "olivia" },
];

export default function ParentsContacts() {
  return (
    <Card shadow="none" className="bg-default">
      <CardBody className="p-6">
        <h2 className="text-lg font-semibold">Parents&apos; Contacts</h2>
        <p className="text-xs text-foreground/50 mt-0.5 mb-5">Here you can see parents and their contacts.</p>
        <div className="flex flex-col gap-4">
          {CONTACTS.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <Avatar
                src={`https://i.pravatar.cc/80?u=${c.avatar}`}
                size="sm"
                className="w-10 h-10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-foreground/50">{c.role}</p>
              </div>
              <span className="text-xs text-foreground/70 shrink-0">{c.phone}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button size="sm" variant="bordered" radius="full" className="text-xs border-foreground/20 font-medium">
            Show all
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
