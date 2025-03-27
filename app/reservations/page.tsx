"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Mail,
  Info,
  MenuIcon,
  Phone,
  Search,
  Trash2,
  Users,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function ReservationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTab, setSelectedTab] = useState("all")
  const [reservations, setReservations] = useState([
    {
      id: "1",
      name: "John Doe",
      date: new Date(),
      time: "19:00",
      guests: 4,
      table: "Table 5",
      status: "upcoming",
      phone: "555-123-4567",
      email: "john@example.com",
      notes: "Anniversary dinner",
    },
    {
      id: "2",
      name: "Jane Smith",
      date: new Date(),
      time: "20:30",
      guests: 2,
      table: "Table 8",
      status: "completed",
      phone: "555-987-6543",
      email: "jane@example.com",
    },
    {
      id: "3",
      name: "Peter Jones",
      date: new Date(),
      time: "18:00",
      guests: 6,
      table: "Table 12",
      status: "cancelled",
      phone: "555-456-7890",
      email: "peter@example.com",
    },
    {
      id: "4",
      name: "Alice Brown",
      date: addDays(new Date(), 1),
      time: "19:30",
      guests: 3,
      table: "Table 3",
      status: "upcoming",
      phone: "555-789-0123",
      email: "alice@example.com",
    },
    {
      id: "5",
      name: "Bob Green",
      date: addDays(new Date(), 2),
      time: "20:00",
      guests: 5,
      table: "Table 10",
      status: "upcoming",
      phone: "555-234-5678",
      email: "bob@example.com",
    },
    {
      id: "6",
      name: "Charlie White",
      date: addDays(new Date(), -1),
      time: "19:00",
      guests: 2,
      table: "Table 7",
      status: "completed",
      phone: "555-345-6789",
      email: "charlie@example.com",
      notes: "Gluten-free meal requested",
    },
  ])

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

  const goToPreviousDay = () => {
    setSelectedDate((prevDate) => {
      if (!prevDate) return new Date()
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 1)
      return newDate
    })
  }

  const goToNextDay = () => {
    setSelectedDate((prevDate) => {
      if (!prevDate) return new Date()
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 1)
      return newDate
    })
  }

  const filteredReservations = reservations.filter((reservation) => {
    if (selectedTab === "all") {
      return true
    }
    return reservation.status === selectedTab
  })

  const sortedReservations = filteredReservations.sort((a, b) => {
    return a.date.getTime() - b.date.getTime()
  })

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
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
            <h1 className="text-xl font-bold">Reservations</h1>
            <p className="text-sm text-gray-500">Manage your restaurant bookings and table assignments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          <div className="flex flex-col h-full">
            {/* Search and Date Navigation */}
            <div className="flex flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search reservations..."
                  className="pl-10 w-full h-9 rounded-full border-gray-200 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={goToPreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-9 rounded-full px-3 border-gray-200 font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {selectedDate ? format(selectedDate, "MMM d, yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={goToNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-4" onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Reservations List */}
            <Card className="flex-1 overflow-hidden border-none bg-gray-100">
              <div className="flex justify-between items-center px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Showing {sortedReservations.length} reservation{sortedReservations.length !== 1 ? "s" : ""}
                  </h3>
                </div>
              </div>
              <CardContent className="p-0 border-none">
                <ScrollArea className="h-[calc(100vh-280px)] border-none">
                  {sortedReservations.length > 0 ? (
                    <div className="p-4 grid gap-4 border-none">
                      {sortedReservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-medium">{reservation.name}</h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <CalendarIcon className="h-3.5 w-3.5" />
                                  <span>{format(reservation.date, "MMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{reservation.time || "19:00"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                  <Users className="h-3.5 w-3.5" />
                                  <span>{reservation.guests || 2} guests</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={`${reservation.status === "upcoming"
                                  ? "bg-green-700/90 hover:bg-green-700"
                                  : reservation.status === "completed"
                                    ? "bg-blue-700/90 hover:bg-blue-700"
                                    : "bg-red-700/90 hover:bg-red-700"
                                } shadow-sm`}
                            >
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{reservation.phone || "555-123-4567"}</span>
                              </div>
                              {reservation.email && (
                                <div className="flex items-center gap-1.5">
                                  <Mail className="h-3.5 w-3.5" />
                                  <span className="hidden md:inline">{reservation.email}</span>
                                </div>
                              )}
                              <div className="font-medium text-primary">{reservation.table || "Table 5"}</div>
                            </div>

                            {/* Actions */}
                            {reservation.status === "upcoming" && (
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            )}

                            {reservation.status === "completed" && (
                              <Button variant="ghost" className="">
                                <Info className="h-3.5 w-3.5" /> View Details
                              </Button>
                            )}

                          </div>
                          {reservation.notes && (
                            <div className="mt-3 text-sm text-gray-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                              <div className="font-medium text-amber-700 mb-1">Notes:</div>
                              {reservation.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No reservations found.</div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

