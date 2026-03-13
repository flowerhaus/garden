"use client";

import { Card, CardBody } from "@heroui/react";

export default function HeroSection() {
  return (
    <Card shadow="none" className="bg-default">
      <CardBody className="p-8">
        <h1 className="text-4xl lg:text-[42px] leading-tight tracking-tight">
          <span className="font-light">Keep </span>
          <span className="italic font-light">Your</span>
          <br />
          <span className="font-semibold">Children&apos;s Success</span>
        </h1>
        <div className="mt-8">
          <p className="text-sm text-foreground/50">Grading in education</p>
          <p className="text-6xl lg:text-7xl font-light tracking-tighter mt-1">C, 87%</p>
        </div>
        <p className="text-sm text-foreground/50 mt-6">
          Latest update added: <span className="font-medium text-foreground">January 29</span>
        </p>
      </CardBody>
    </Card>
  );
}
