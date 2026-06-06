export const user = {
  name: 'Mihret Alemu',
  firstName: 'Mihret',
  gender: 'Female',
  age: 34,
  location: 'Addis Ababa',
  conditions: ['Hypertension risk'],
  avatar: 'MA',
}

export const biometrics = {
  heartRate: {
    value: 78,
    unit: 'BPM',
    status: 'normal',
    color: 'calm',
    percent: 78,
    goal: 100,
    trend: [72, 74, 75, 76, 77, 78, 78],
  },
  hrv: {
    value: 42,
    unit: 'ms',
    status: 'borderline',
    color: 'amber',
    percent: 42,
    goal: 80,
    trend: [48, 46, 45, 44, 43, 42, 42],
  },
  sleep: {
    value: 4.8,
    unit: 'h',
    status: 'critical',
    color: 'pulse',
    percent: 48,
    goal: 8,
    trend: [6.2, 5.8, 5.1, 4.9, 4.8, 4.7, 4.8],
  },
  steps: {
    value: 7200,
    unit: '',
    status: 'below-goal',
    color: 'fuchsia',
    percent: 72,
    goal: 10000,
    trend: [8500, 7800, 7400, 7100, 6900, 7000, 7200],
  },
}

export const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const mentalWellness = {
  status: 'Sympathetic Dominance Detected',
  hrvTrend: [52, 48, 45, 42, 40, 38, 42],
  screenTimeTrend: [4.2, 5.1, 5.8, 6.2, 6.5, 7.1, 6.8],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  chartData: [
    { day: 'Mon', hrv: 52, screen: 4.2 },
    { day: 'Tue', hrv: 48, screen: 5.1 },
    { day: 'Wed', hrv: 45, screen: 5.8 },
    { day: 'Thu', hrv: 42, screen: 6.2 },
    { day: 'Fri', hrv: 40, screen: 6.5 },
    { day: 'Sat', hrv: 38, screen: 7.1 },
    { day: 'Sun', hrv: 42, screen: 6.8 },
  ],
}

export const sentinelAlert = {
  triggered: true,
  title: 'Hypertension Risk Detected',
  body: '3 consecutive nights of severe sleep deprivation combined with rising resting heart rate indicate elevated cortisol and blood pressure risk.',
  recommendations: ['Hydrate Now', 'Rest Today', 'Consult Doctor'],
}

export const foodLogs = [
  { id: 1, name: 'Injera', amount: '2 pieces', calories: 320, carbs: 58, protein: 8, gl: 14 },
  { id: 2, name: 'Shiro', amount: '1 bowl', calories: 210, carbs: 28, protein: 12, gl: 8 },
  { id: 3, name: 'Tibs', amount: '1 serving', calories: 380, carbs: 12, protein: 28, gl: 2 },
  { id: 4, name: 'Teff Porridge', amount: '1 cup', calories: 180, carbs: 32, protein: 6, gl: 9 },
]

export const nutritionSummary = {
  calories: 1840,
  carbs: 210,
  protein: 54,
  glycemicLoad: 28,
}

export const communityPeers = [
  { id: 1, name: 'Biruk', initials: 'BR', status: 'checked-in', lastCheckIn: '2h ago', ringColor: 'green' },
  { id: 2, name: 'Tigist', initials: 'TG', status: 'checked-in', lastCheckIn: 'Yesterday', ringColor: 'green' },
  { id: 3, name: 'Dawit', initials: 'DW', status: 'overdue', lastCheckIn: '3 days ago', ringColor: 'red', emergency: true },
  { id: 4, name: 'Hana', initials: 'HN', status: 'checked-in', lastCheckIn: '4h ago', ringColor: 'green' },
]

export const kuriftuPrescription = {
  title: 'Damakese Botanical Restoration',
  body: 'Your stress markers have been elevated for 9 consecutive days. This restorative treatment has been formulated for your biometric profile.',
  spa: 'Boston Day Spa',
}

export const trainerClients = [
  {
    id: 1,
    name: 'Selam Tadesse',
    initials: 'ST',
    badge: 'MODERATE',
    recoveryScore: 61,
    sleep: 6.2,
    hrv: 38,
    restingHR: 82,
    prescription: 'LIGHT SESSION',
    sleepTrend: [5.8, 6.0, 6.1, 6.0, 6.3, 6.1, 6.2],
    hrvTrend: [42, 40, 39, 38, 37, 38, 38],
    hrTrend: [78, 79, 80, 81, 81, 82, 82],
  },
  {
    id: 2,
    name: 'Abel Mekonnen',
    initials: 'AM',
    badge: 'GOOD',
    recoveryScore: 82,
    sleep: 7.5,
    hrv: 52,
    restingHR: 68,
    prescription: 'TRAIN HARD',
    sleepTrend: [7.0, 7.2, 7.4, 7.5, 7.6, 7.4, 7.5],
    hrvTrend: [48, 49, 50, 51, 52, 51, 52],
    hrTrend: [70, 69, 68, 68, 67, 68, 68],
  },
  {
    id: 3,
    name: 'Helen Girma',
    initials: 'HG',
    badge: 'REST',
    recoveryScore: 34,
    sleep: 4.5,
    hrv: 28,
    restingHR: 88,
    prescription: 'REST DAY',
    sleepTrend: [5.0, 4.8, 4.6, 4.5, 4.4, 4.5, 4.5],
    hrvTrend: [32, 30, 29, 28, 27, 28, 28],
    hrTrend: [84, 85, 86, 87, 88, 87, 88],
  },
]

export const fhirLoincCodes = {
  'Heart Rate': '8867-4',
  HRV: '80404-7',
  Sleep: '93832-4',
  'Blood Pressure': '85354-9',
}

export const fhirMetricOptions = [
  { key: 'Heart Rate', loinc: '8867-4', unit: 'beats/minute' },
  { key: 'HRV', loinc: '80404-7', unit: 'ms' },
  { key: 'Sleep', loinc: '93832-4', unit: 'h' },
  { key: 'Blood Pressure', loinc: '85354-9', unit: 'mmHg' },
]

export const ethiopianFoods = [
  'Injera', 'Shiro', 'Doro Wat', 'Kitfo', 'Tibs', 'Teff Porridge',
  'Misir Wat', 'Gomen', 'Ayib', 'Firfir', 'Genfo', 'Chechebsa',
]

export const partners = [
  'Apple Health', 'Google Health Connect', 'WeVa Sphere', 'Kuriftu Resorts', 'EFCT 2025',
]

export const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/grounding', label: 'Grounding' },
  { path: '/community', label: 'Community' },
  { path: '/trainer', label: 'Trainer' },
  { path: '/fhir', label: 'FHIR Explorer' },
]

export const sparklineColors = {
  heartRate: '#6BAE75',
  hrv: '#F0A500',
  sleep: '#FF4C6A',
  steps: '#A4407C',
}

export const ringLabels = {
  heartRate: 'Heart Rate',
  hrv: 'HRV',
  sleep: 'Sleep',
  steps: 'Steps',
}
