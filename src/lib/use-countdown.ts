import { useEffect, useState } from "react";

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Milliseconds left until `target`, updated every second. null until mounted so server and
// client render the same markup.
export function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), SECOND);
    return () => clearInterval(interval);
  }, [target]);

  return now === null ? null : Math.max(0, target - now);
}

// Splits a duration into days, hours, minutes and seconds
export function splitDuration(ms: number) {
  return {
    days: Math.floor(ms / DAY),
    hours: Math.floor((ms % DAY) / HOUR),
    minutes: Math.floor((ms % HOUR) / MINUTE),
    seconds: Math.floor((ms % MINUTE) / SECOND),
  };
}
