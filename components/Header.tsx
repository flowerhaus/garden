"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type WeatherData = {
  temp: number;
  code: number;
} | null;

// WMO weather codes → simple icon
function WeatherIcon({ code }: { code: number }) {
  // Clear
  if (code <= 1) return <span className="header-weather-icon">&#9728;&#65039;</span>;
  // Partly cloudy
  if (code <= 3) return <span className="header-weather-icon">&#9925;</span>;
  // Fog
  if (code >= 45 && code <= 48) return <span className="header-weather-icon">&#127787;&#65039;</span>;
  // Rain / drizzle
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <span className="header-weather-icon">&#127783;&#65039;</span>;
  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <span className="header-weather-icon">&#10052;&#65039;</span>;
  // Thunderstorm
  if (code >= 95) return <span className="header-weather-icon">&#9889;</span>;
  // Overcast fallback
  return <span className="header-weather-icon">&#9729;&#65039;</span>;
}

interface HeaderProps {
  userName: string | null;
  userEmail: string;
}

const PROJECTS = [
  { id: "magiens-logik", name: "Magiens Logik", active: true },
  { id: "nordlys", name: "Nordlys", active: false },
];

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/projekter", label: "Projekter" },
  { href: "/dashboard/godkendelser", label: "Godkendelser" },
  { href: "/dashboard/filer", label: "Filer" },
  { href: "/dashboard/kalender", label: "Kalender" },
  { href: "/dashboard/team", label: "Team" },
];

export default function Header({ userName, userEmail }: HeaderProps) {
  const pathname = usePathname();
  const [projectOpen, setProjectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = (userName || userEmail)
    .split(/[\s@]/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  const currentProject = PROJECTS.find((p) => p.active) || PROJECTS[0];

  const [weather, setWeather] = useState<WeatherData>(null);
  const [now, setNow] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather for Faaborg (lat 55.10, lon 10.24)
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=55.10&longitude=10.24&current_weather=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode,
          });
        }
      })
      .catch(() => {});
  }, []);

  const dateStr = now.toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeStr = now.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Close dropdown on outside click
  useEffect(() => {
    if (!projectOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [projectOpen]);

  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="12"
                y1="12"
                x2={12 + 8 * Math.cos((angle * Math.PI) / 180)}
                y2={12 + 8 * Math.sin((angle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </span>
        <img src="/garden-logo.svg" alt="Garden" className="header-logo" />
      </div>
      <nav className="header-nav">
        {NAV_LINKS.map((link) => {
          const isActive = link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`header-nav-link${isActive ? " active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="header-right">
        <div className="header-nav-dropdown" ref={dropdownRef}>
          <button
            className={`header-project-btn ${projectOpen ? "header-project-btn--open" : ""}`}
            onClick={() => setProjectOpen(!projectOpen)}
          >
            <span className="header-project-dot" />
            {currentProject.name}
          </button>
          {projectOpen && (
            <div className="header-dropdown-menu header-dropdown-menu--right">
              <div className="header-dropdown-label">Skift projekt</div>
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  className={`header-dropdown-item ${p.active ? "header-dropdown-item--active" : ""}`}
                  onClick={() => setProjectOpen(false)}
                >
                  <span className="header-dropdown-dot" />
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="header-meta">
          {weather && <WeatherIcon code={weather.code} />}
          {weather && <span className="header-meta-temp">{weather.temp}&#176;</span>}
          <span className="header-meta-date">{dateStr} {timeStr}</span>
        </span>
        <div className="header-user">
          <div className="header-user-avatar">{initials}</div>
          <span className="header-name">Konto</span>
        </div>
      </div>
    </header>
  );
}
