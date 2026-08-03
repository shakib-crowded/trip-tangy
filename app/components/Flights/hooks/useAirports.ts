"use client";
import { useState, useEffect } from "react";
import type { AirportRecord } from "../Hero/AirportField";

let _airportCache: AirportRecord[] | null = null;
let _airportPromise: Promise<AirportRecord[]> | null = null;

const loadAirports = (): Promise<AirportRecord[]> => {
  if (_airportCache) return Promise.resolve(_airportCache);
  if (_airportPromise) return _airportPromise;
  _airportPromise = fetch("/data/airports.json")
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load airports.json (${r.status})`);
      return r.json() as Promise<AirportRecord[]>;
    })
    .then((data) => {
      _airportCache = data.filter((a) => a.iata_code && a.iata_code.trim().length === 3);
      return _airportCache;
    });
  return _airportPromise;
};

export const useAirports = () => {
  const [airports, setAirports] = useState<AirportRecord[]>(_airportCache ?? []);
  const [loading, setLoading] = useState(!_airportCache);
  const [error, setError] = useState("");

  useEffect(() => {
    if (_airportCache) return;
    let cancelled = false;
    setLoading(true);
    loadAirports()
      .then((data) => { if (cancelled) return; _airportCache = data; setAirports(data); })
      .catch((e: Error) => { if (cancelled) return; setError(e.message); })
      .finally(() => { if (cancelled) return; setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { airports, loading, error };
};