"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "../../components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuIcon, Download, Calendar, TrendingUp, DollarSign, Percent, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, startOfMonth, endOfMonth } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  PolarGrid,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  LabelList,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  rubyPrimary,
  rubyBg,
  sapphirePrimary,
  sapphireBg,
  generatePaymentMethodData,
  generateHourlyData,
  customerData,
  visitorChartConfig,
  weeklyChartConfig,
  weeklyPerformanceData,
  transactionsData,
  dailyChartData,
  dailyChartConfig,
  sapphireLight,
  rubyLight,
  totalSales,
  totalExpenses,
  totalProfit,
  profitMargin,
} from "@/data/analytics-data"

export default function AccountingPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [transactions] = useState(transactionsData)

  // Calculate total visitors
  const totalVisitors = customerData.reduce((sum, item) => sum + item.visitors, 0)

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])



  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} hideToggle={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 flex items-center gap-4 border-b">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-transparent"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold">Analytics</h1>
            {!isMobile && (
              <p className="text-sm text-gray-500">Financial accounting and reporting</p>
            )}
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Main Content */}
        <ScrollArea className="flex-1 m-4">
          {/* Date Range Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Financial Overview</h2>
              <p className="text-sm text-gray-500">
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMMM d, yyyy")} - ${format(dateRange.to, "MMMM d, yyyy")}`
                  : "Select a date range"}
              </p>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to })
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sales</SelectItem>
                  <SelectItem value="dine-in">Dine-in</SelectItem>
                  <SelectItem value="takeaway">Takeaway</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">${totalSales.toLocaleString()}</h3>
                    <div className="flex items-center mt-1 text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">+12.5% from last month</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full" style={{ backgroundColor: rubyBg }}>
                    <DollarSign className="h-5 w-5" style={{ color: rubyPrimary }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                    <h3 className="text-2xl font-bold mt-1">${totalExpenses.toLocaleString()}</h3>
                    <div className="flex items-center mt-1 text-red-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">+8.3% from last month</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full" style={{ backgroundColor: sapphireBg }}>
                    <DollarSign className="h-5 w-5" style={{ color: sapphirePrimary }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Net Profit</p>
                    <h3 className="text-2xl font-bold mt-1">${totalProfit.toLocaleString()}</h3>
                    <div className="flex items-center mt-1 text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">+15.2% from last month</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full" style={{ backgroundColor: rubyBg }}>
                    <DollarSign className="h-5 w-5" style={{ color: rubyPrimary }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Profit Margin</p>
                    <h3 className="text-2xl font-bold mt-1">{profitMargin.toFixed(1)}%</h3>
                    <div className="flex items-center mt-1 text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">+2.3% from last month</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full" style={{ backgroundColor: sapphireBg }}>
                    <Percent className="h-5 w-5" style={{ color: sapphirePrimary }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue & Expenses Chart */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue & Expenses</CardTitle>
                <CardDescription>Daily financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ChartContainer config={dailyChartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={dailyChartData}>
                      <defs>
                        <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }}
                      />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            }}
                            indicator="dot"
                          />
                        }
                      />
                      <Area
                        dataKey="sales"
                        type="natural"
                        fill={rubyLight}
                        stroke={rubyPrimary}
                        stackId="a"
                      />
                      <Area
                        dataKey="profit"
                        type="natural"
                        fill={sapphireLight}
                        stroke={sapphirePrimary}
                        stackId="a"
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Performance and Visitor Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Sales and customer trends by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] sm:h-[280px] mb-2">
                  <ChartContainer config={weeklyChartConfig} className="w-full h-full">
                    <BarChart
                      accessibilityLayer
                      data={weeklyPerformanceData}
                      margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 20,
                      }}
                      layout="horizontal"
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Bar
                        dataKey="sales"
                        fill={sapphirePrimary}
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        isAnimationActive={false}
                        cursor="default"
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col overflow-hidden shadow-md">
              <CardHeader className="items-center pb-0 pt-5">
                <CardTitle className="text-xl font-bold text-gray-800">Customer Statistics</CardTitle>
                <CardDescription className="text-gray-500 font-medium">Monthly breakdown by segment</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer config={visitorChartConfig} className="mx-auto aspect-square max-h-[250px]">
                  <RadialBarChart data={customerData} startAngle={0} endAngle={250} innerRadius={80} outerRadius={110}>
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-muted last:fill-background"
                      polarRadius={[86, 74]}
                    />
                    <RadialBar dataKey="visitors" background cornerRadius={10} />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 8.3% this month <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="leading-none text-muted-foreground">Showing total visitors across all segments</div>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto -mx-6 px-6">
                <table className="w-full min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left font-medium text-sm text-muted-foreground">Transaction ID</th>
                      <th className="py-3 px-2 text-left font-medium text-sm text-muted-foreground hidden md:table-cell">
                        Date
                      </th>
                      <th className="py-3 px-2 text-left font-medium text-sm text-muted-foreground">Amount</th>
                      <th className="py-3 px-2 text-left font-medium text-sm text-muted-foreground hidden sm:table-cell">
                        Type
                      </th>
                      <th className="py-3 px-2 text-left font-medium text-sm text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, i) => (
                      <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-2 text-sm font-medium">{transaction.id}</td>
                        <td className="py-3 px-2 text-sm hidden md:table-cell">
                          {format(transaction.date, "MMM dd, yyyy")}
                        </td>
                        <td className="py-3 px-2 text-sm">${transaction.amount.toFixed(2)}</td>
                        <td className="py-3 px-2 text-sm hidden sm:table-cell">{transaction.type}</td>
                        <td className="py-3 px-2 text-sm">
                          <Badge
                            variant={transaction.status === "Completed" ? "success" : "destructive"}
                            className="rounded-full px-2 py-0.5 text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </ScrollArea>
      </div>
    </div>
  )
}

