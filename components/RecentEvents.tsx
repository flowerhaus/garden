"use client";

import { Card, CardBody, Avatar, Button } from "@heroui/react";

export default function RecentEvents() {
  return (
    <Card shadow="none" className="bg-default">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Recent Events</h2>
          <Button size="sm" variant="bordered" radius="full" className="text-xs border-foreground/20 font-medium">
            Show all
          </Button>
        </div>

        {/* Event card */}
        <div className="bg-background/50 rounded-xl p-4 border border-foreground/8">
          {/* Author */}
          <div className="flex items-center gap-2.5 mb-3">
            <Avatar
              src="https://i.pravatar.cc/80?u=connor"
              size="sm"
              className="w-9 h-9"
            />
            <div>
              <p className="text-sm font-medium">Connor Elington</p>
              <p className="text-xs text-foreground/50">Teacher Coordinator</p>
            </div>
          </div>

          {/* Event content */}
          <h3 className="text-sm font-semibold mb-1.5">Book Fair</h3>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Join us on March 15 for our Book Fair! Explore captivating reads for the entire family, seize the opportunity to enrich...
          </p>

          {/* Reactions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs bg-foreground/8 px-2 py-0.5 rounded-full">
                <span>&#128077;</span><span className="font-medium">7</span>
              </span>
              <span className="flex items-center gap-1 text-xs bg-foreground/8 px-2 py-0.5 rounded-full">
                <span>&#127775;</span><span className="font-medium">3</span>
              </span>
              <span className="flex items-center gap-1 text-xs bg-foreground/8 px-2 py-0.5 rounded-full">
                <span>&#128640;</span><span className="font-medium">5</span>
              </span>
            </div>
            <span className="text-[10px] text-foreground/40">January 27, 1:43 PM</span>
          </div>

          {/* Comments & CTA */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-foreground/8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <Avatar src="https://i.pravatar.cc/40?u=c1" size="sm" className="w-6 h-6 ring-2 ring-default" />
                <Avatar src="https://i.pravatar.cc/40?u=c2" size="sm" className="w-6 h-6 ring-2 ring-default" />
                <Avatar src="https://i.pravatar.cc/40?u=c3" size="sm" className="w-6 h-6 ring-2 ring-default" />
              </div>
              <span className="text-xs text-foreground/50">29 comments</span>
            </div>
            <Button size="sm" variant="bordered" radius="full" className="text-xs border-foreground/20 font-medium h-7">
              + Add to calendar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
