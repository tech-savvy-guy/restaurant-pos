import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
import type { ChartConfig } from "@/components/ui/chart"

// Ruby theme colors
export const rubyPrimary = "hsl(348, 83%, 47%)" // Deep ruby red
export const rubySecondary = "hsl(348, 83%, 57%)" // Medium ruby
export const rubyLight = "hsl(348, 83%, 67%)" // Light ruby background
export const rubyBg = "hsl(348, 83%, 97%)" // Very light ruby background

// Sapphire theme colors
export const sapphirePrimary = "hsl(215, 100%, 50%)" // Deep sapphire blue
export const sapphireSecondary = "hsl(215, 100%, 60%)" // Medium sapphire
export const sapphireLight = "hsl(215, 100%, 70%)" // Light sapphire
export const sapphireBg = "hsl(215, 100%, 97%)" // Very light sapphire background

// Define types for the data
export interface DailyDataItem {
  date: string
  fullDate: Date
  sales: number
  expenses: number
  profit: number
  orders: number
  averageOrder: number
}

export interface PaymentMethodItem {
  name: string
  value: number
  fill: string
}

export interface HourlyDataItem {
  hour: string
  sales: number
  customers: number
}

export interface TransactionItem {
  id: string
  date: Date
  amount: number
  type: string
  paymentMethod: string
  status: string
}

export interface CustomerDataItem {
  name: string
  visitors: number
  fill: string
}

export interface WeeklyDataItem {
  day: string
  sales: number
}

// Generate data for radial bar chart (payment methods)
export const generatePaymentMethodData = (): PaymentMethodItem[] => {
  return [
    { name: "sales Payment", value: 85, fill: sapphirePrimary },
    { name: "Credit Card", value: 75, fill: sapphireSecondary },
    { name: "Cash", value: 55, fill: sapphireLight },
    { name: "Gift Card", value: 35, fill: "hsl(215, 100%, 40%)" },
  ]
}

// Hardcoded hourly data
export const hourlyData: HourlyDataItem[] = [
  { hour: "10 AM", sales: 320, customers: 11 },
  { hour: "11 AM", sales: 480, customers: 16 },
  { hour: "12 PM", sales: 750, customers: 25 },
  { hour: "1 PM", sales: 820, customers: 27 },
  { hour: "2 PM", sales: 450, customers: 15 },
  { hour: "3 PM", sales: 380, customers: 13 },
  { hour: "4 PM", sales: 420, customers: 14 },
  { hour: "5 PM", sales: 680, customers: 23 },
  { hour: "6 PM", sales: 950, customers: 32 },
  { hour: "7 PM", sales: 1050, customers: 35 },
  { hour: "8 PM", sales: 980, customers: 33 },
  { hour: "9 PM", sales: 620, customers: 21 },
  { hour: "10 PM", sales: 320, customers: 11 },
];

export const generateHourlyData = (): HourlyDataItem[] => {
  return [...hourlyData];
}

// Hardcoded transaction data
export const transactionsData: TransactionItem[] = [
  {
    id: "TRX-1001",
    date: new Date(2025, 2, 25),
    amount: 127.50,
    type: "Dine-in",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1002",
    date: new Date(2025, 2, 25),
    amount: 85.20,
    type: "Takeaway",
    paymentMethod: "sales Payment",
    status: "Completed"
  },
  {
    id: "TRX-1003",
    date: new Date(2025, 2, 24),
    amount: 156.75,
    type: "Dine-in",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1004",
    date: new Date(2025, 2, 24),
    amount: 42.30,
    type: "Delivery",
    paymentMethod: "sales Payment",
    status: "Completed"
  },
  {
    id: "TRX-1005",
    date: new Date(2025, 2, 24),
    amount: 98.45,
    type: "Dine-in",
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "TRX-1006",
    date: new Date(2025, 2, 23),
    amount: 65.80,
    type: "Takeaway",
    paymentMethod: "Credit Card",
    status: "Refunded"
  },
  {
    id: "TRX-1007",
    date: new Date(2025, 2, 23),
    amount: 112.35,
    type: "Dine-in",
    paymentMethod: "sales Payment",
    status: "Completed"
  },
  {
    id: "TRX-1008",
    date: new Date(2025, 2, 22),
    amount: 74.90,
    type: "Delivery",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1009",
    date: new Date(2025, 2, 22),
    amount: 135.60,
    type: "Dine-in",
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "TRX-1010",
    date: new Date(2025, 2, 21),
    amount: 28.75,
    type: "Takeaway",
    paymentMethod: "sales Payment",
    status: "Completed"
  },
  {
    id: "TRX-1011",
    date: new Date(2025, 2, 21),
    amount: 187.20,
    type: "Dine-in",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1012",
    date: new Date(2025, 2, 20),
    amount: 54.40,
    type: "Delivery",
    paymentMethod: "sales Payment",
    status: "Refunded"
  },
  {
    id: "TRX-1013",
    date: new Date(2025, 2, 20),
    amount: 92.15,
    type: "Dine-in",
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "TRX-1014",
    date: new Date(2025, 2, 19),
    amount: 67.80,
    type: "Takeaway",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1015",
    date: new Date(2025, 2, 19),
    amount: 145.25,
    type: "Dine-in",
    paymentMethod: "sales Payment",
    status: "Completed"
  },
  {
    id: "TRX-1016",
    date: new Date(2025, 2, 18),
    amount: 38.50,
    type: "Delivery",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1017",
    date: new Date(2025, 2, 18),
    amount: 110.70,
    type: "Dine-in",
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: "TRX-1018",
    date: new Date(2025, 2, 18),
    amount: 72.90,
    type: "Takeaway",
    paymentMethod: "sales Payment",
    status: "Refunded"
  },
  {
    id: "TRX-1019",
    date: new Date(2025, 2, 17),
    amount: 128.45,
    type: "Dine-in",
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-1020",
    date: new Date(2025, 2, 17),
    amount: 49.95,
    type: "Delivery",
    paymentMethod: "sales Payment",
    status: "Completed"
  }
];

// Replace the random generation function with one that returns the hardcoded data
export const generateTransactions = (): TransactionItem[] => {
  return [...transactionsData]; // Return a copy to avoid mutation
}

// Visitor data for the stacked radial chart
export const customerData: CustomerDataItem[] = [
  { name: "Walk-in", visitors: 3200, fill: rubyPrimary },
  { name: "Reservations", visitors: 2400, fill: rubySecondary },
]

export const visitorChartConfig = {
  dineIn: {
    label: "Dine-in",
    color: "hsl(var(--chart-1))",
  },
  takeaway: {
    label: "Takeaway",
    color: "hsl(var(--chart-2))",
  },
  delivery: {
    label: "Delivery",
    color: "hsl(var(--chart-3))",
  },
  events: {
    label: "Events",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export const weeklyChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const weeklyPerformanceData: WeeklyDataItem[] = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 3800 },
  { day: "Wed", sales: 4500 },
  { day: "Thu", sales: 5100 },
  { day: "Fri", sales: 7200 },
  { day: "Sat", sales: 8500 },
  { day: "Sun", sales: 6800 },
]

export const dailyChartData = [
  { date: "2024-04-01", sales: 222, profit: 150 },
  { date: "2024-04-02", sales: 97, profit: 180 },
  { date: "2024-04-03", sales: 167, profit: 120 },
  { date: "2024-04-04", sales: 242, profit: 260 },
  { date: "2024-04-05", sales: 373, profit: 290 },
  { date: "2024-04-06", sales: 301, profit: 340 },
  { date: "2024-04-07", sales: 245, profit: 180 },
  { date: "2024-04-08", sales: 409, profit: 320 },
  { date: "2024-04-09", sales: 59, profit: 110 },
  { date: "2024-04-10", sales: 261, profit: 190 },
  { date: "2024-04-11", sales: 327, profit: 350 },
  { date: "2024-04-12", sales: 292, profit: 210 },
  { date: "2024-04-13", sales: 342, profit: 380 },
  { date: "2024-04-14", sales: 137, profit: 220 },
  { date: "2024-04-15", sales: 120, profit: 170 },
  { date: "2024-04-16", sales: 138, profit: 190 },
  { date: "2024-04-17", sales: 446, profit: 360 },
  { date: "2024-04-18", sales: 364, profit: 410 },
  { date: "2024-04-19", sales: 243, profit: 180 },
  { date: "2024-04-20", sales: 89, profit: 150 },
  { date: "2024-04-21", sales: 137, profit: 200 },
  { date: "2024-04-22", sales: 224, profit: 170 },
  { date: "2024-04-23", sales: 138, profit: 230 },
  { date: "2024-04-24", sales: 387, profit: 290 },
  { date: "2024-04-25", sales: 215, profit: 250 },
  { date: "2024-04-26", sales: 75, profit: 130 },
  { date: "2024-04-27", sales: 383, profit: 420 },
  { date: "2024-04-28", sales: 122, profit: 180 },
  { date: "2024-04-29", sales: 315, profit: 240 },
  { date: "2024-04-30", sales: 454, profit: 380 },
  { date: "2024-05-01", sales: 165, profit: 220 },
  { date: "2024-05-02", sales: 293, profit: 310 },
  { date: "2024-05-03", sales: 247, profit: 190 },
  { date: "2024-05-04", sales: 385, profit: 420 },
  { date: "2024-05-05", sales: 481, profit: 390 },
  { date: "2024-05-06", sales: 498, profit: 520 },
  { date: "2024-05-07", sales: 388, profit: 300 },
  { date: "2024-05-08", sales: 149, profit: 210 },
  { date: "2024-05-09", sales: 227, profit: 180 },
  { date: "2024-05-10", sales: 293, profit: 330 },
  { date: "2024-05-11", sales: 335, profit: 270 },
  { date: "2024-05-12", sales: 197, profit: 240 },
  { date: "2024-05-13", sales: 197, profit: 160 },
  { date: "2024-05-14", sales: 448, profit: 490 },
  { date: "2024-05-15", sales: 473, profit: 380 },
  { date: "2024-05-16", sales: 338, profit: 400 },
  { date: "2024-05-17", sales: 499, profit: 420 },
  { date: "2024-05-18", sales: 315, profit: 350 },
  { date: "2024-05-19", sales: 235, profit: 180 },
  { date: "2024-05-20", sales: 177, profit: 230 },
  { date: "2024-05-21", sales: 82, profit: 140 },
  { date: "2024-05-22", sales: 81, profit: 120 },
  { date: "2024-05-23", sales: 252, profit: 290 },
  { date: "2024-05-24", sales: 294, profit: 220 },
  { date: "2024-05-25", sales: 201, profit: 250 },
  { date: "2024-05-26", sales: 213, profit: 170 },
  { date: "2024-05-27", sales: 420, profit: 460 },
  { date: "2024-05-28", sales: 233, profit: 190 },
  { date: "2024-05-29", sales: 78, profit: 130 },
  { date: "2024-05-30", sales: 340, profit: 280 },
  { date: "2024-05-31", sales: 178, profit: 230 },
  { date: "2024-06-01", sales: 178, profit: 200 },
  { date: "2024-06-02", sales: 470, profit: 410 },
  { date: "2024-06-03", sales: 103, profit: 160 },
  { date: "2024-06-04", sales: 439, profit: 380 },
  { date: "2024-06-05", sales: 88, profit: 140 },
  { date: "2024-06-06", sales: 294, profit: 250 },
  { date: "2024-06-07", sales: 323, profit: 370 },
  { date: "2024-06-08", sales: 385, profit: 320 },
  { date: "2024-06-09", sales: 438, profit: 480 },
  { date: "2024-06-10", sales: 155, profit: 200 },
  { date: "2024-06-11", sales: 92, profit: 150 },
  { date: "2024-06-12", sales: 492, profit: 420 },
  { date: "2024-06-13", sales: 81, profit: 130 },
  { date: "2024-06-14", sales: 426, profit: 380 },
  { date: "2024-06-15", sales: 307, profit: 350 },
  { date: "2024-06-16", sales: 371, profit: 310 },
  { date: "2024-06-17", sales: 475, profit: 520 },
  { date: "2024-06-18", sales: 107, profit: 170 },
  { date: "2024-06-19", sales: 341, profit: 290 },
  { date: "2024-06-20", sales: 408, profit: 450 },
  { date: "2024-06-21", sales: 169, profit: 210 },
  { date: "2024-06-22", sales: 317, profit: 270 },
  { date: "2024-06-23", sales: 480, profit: 530 },
  { date: "2024-06-24", sales: 132, profit: 180 },
  { date: "2024-06-25", sales: 141, profit: 190 },
  { date: "2024-06-26", sales: 434, profit: 380 },
  { date: "2024-06-27", sales: 448, profit: 490 },
  { date: "2024-06-28", sales: 149, profit: 200 },
  { date: "2024-06-29", sales: 103, profit: 160 },
  { date: "2024-06-30", sales: 446, profit: 400 },
]

export const dailyChartConfig = {
  visitors: {
    label: "Visitors",
  },
  profit: {
    label: "Profit",
    color: sapphirePrimary,
  },
  sales: {
    label: "Sales",
    color: rubyPrimary,
  },
} satisfies ChartConfig

export const totalSales: number = 44680
export const totalProfit: number = 25951
export const profitMargin: number = 58.1
export const totalExpenses: number = 18729
