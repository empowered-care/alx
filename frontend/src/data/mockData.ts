export const user = {
  name: "Mihret Alemu",
  city: "Addis Ababa",
  age: 34,
  condition: "Hypertension risk",
};

export const metrics = {
  heartRate: { value: 78, unit: "BPM", goal: 100, state: "calm" as const },
  hrv: { value: 42, unit: "ms", goal: 80, state: "data" as const },
  sleep: { value: 4.8, unit: "h", goal: 8, state: "pulse" as const },
  steps: { value: 7200, unit: "", goal: 10000, state: "fuchsia" as const },
};

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const trend = {
  hr: days.map((d, i) => ({ d, v: 70 + i * 1.5 + (i === 3 ? 4 : 0) })),
  hrv: days.map((d, i) => ({ d, v: 60 - i * 2.5 })),
  sleep: days.map((d, i) => ({ d, v: i < 4 ? 7 - i * 0.3 : 4.8 })),
  steps: days.map((d, i) => ({ d, v: 6000 + i * 400 })),
  hrvVsScreen: days.map((d, i) => ({ d, hrv: 60 - i * 2.5, screen: 3 + i * 0.6 })),
};

export const foods = [
  { name: "Injera", qty: "2 pieces", cal: 320, gl: 14 },
  { name: "Shiro", qty: "1 bowl", cal: 210, gl: 8 },
  { name: "Tibs", qty: "1 serving", cal: 380, gl: 2 },
  { name: "Teff Porridge", qty: "1 cup", cal: 180, gl: 9 },
];

export const peers = [
  { name: "Biruk", initials: "BR", state: "ok", last: "2h ago" },
  { name: "Tigist", initials: "TG", state: "ok", last: "yesterday" },
  { name: "Dawit", initials: "DW", state: "alert", last: "3 days ago", emergency: true },
  { name: "Hana", initials: "HN", state: "ok", last: "4h ago" },
];

export const trainerClients = [
  { name: "Selam Tadesse", badge: "MODERATE", score: 61, sleep: 6.2, hrv: 38, rhr: 82 },
  { name: "Yonas Bekele", badge: "GOOD", score: 84, sleep: 7.8, hrv: 62, rhr: 64 },
  { name: "Liya Mengistu", badge: "REST", score: 38, sleep: 4.1, hrv: 28, rhr: 88 },
  { name: "Abel Hailu", badge: "GOOD", score: 79, sleep: 7.2, hrv: 58, rhr: 66 },
];
