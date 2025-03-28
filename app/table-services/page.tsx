"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuIcon, Search, Plus, Users, Clock, MoreHorizontal, Utensils, DollarSign } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { CartItem } from "@/components/cart"

// Define types for table data
interface TableItem {
  id: number
  number: string
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  occupiedSince?: Date
  reservation?: {
    name: string
    time: Date
    guests: number
    phone: string
  }
  orders?: CartItem[]
}

// Define types for floor/section data
interface FloorSection {
  id: string
  name: string
}

// Sample data for tables
const tablesData: TableItem[] = [
  {
    id: 1,
    number: "T1",
    capacity: 2,
    status: "available",
  },
  {
    id: 2,
    number: "T2",
    capacity: 4,
    status: "occupied",
    occupiedSince: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    orders: [
      {
        id: 1,
        image: "/placeholder.svg?height=80&width=80",
        title: "Margherita Pizza",
        price: 12.99,
        type: "Veg",
        category: "Main Course",
        quantity: 1,
      },
      {
        id: 2,
        image: "/placeholder.svg?height=80&width=80",
        title: "Caesar Salad",
        price: 8.99,
        type: "Veg",
        category: "Starters",
        quantity: 1,
      },
      {
        id: 3,
        image: "/placeholder.svg?height=80&width=80",
        title: "Sparkling Water",
        price: 3.99,
        type: "Veg",
        category: "Beverages",
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    number: "T3",
    capacity: 6,
    status: "reserved",
    reservation: {
      name: "John Smith",
      time: new Date(Date.now() + 30 * 60000), // 30 minutes from now
      guests: 5,
      phone: "555-123-4567",
    },
  },
  {
    id: 4,
    number: "T4",
    capacity: 4,
    status: "occupied",
    occupiedSince: new Date(Date.now() - 90 * 60000), // 90 minutes ago
    orders: [
      {
        id: 4,
        image: "/placeholder.svg?height=80&width=80",
        title: "Beef Burger",
        price: 14.99,
        type: "Non Veg",
        category: "Main Course",
        quantity: 2,
      },
      {
        id: 5,
        image: "/placeholder.svg?height=80&width=80",
        title: "French Fries",
        price: 5.99,
        type: "Veg",
        category: "Sides",
        quantity: 1,
      },
      {
        id: 6,
        image: "/placeholder.svg?height=80&width=80",
        title: "Chocolate Milkshake",
        price: 6.99,
        type: "Veg",
        category: "Beverages",
        quantity: 2,
      },
    ],
  },
  {
    id: 5,
    number: "T5",
    capacity: 2,
    status: "cleaning",
  },
  {
    id: 6,
    number: "T6",
    capacity: 8,
    status: "available",
  },
  {
    id: 7,
    number: "T7",
    capacity: 4,
    status: "occupied",
    occupiedSince: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    orders: [
      {
        id: 7,
        image: "/placeholder.svg?height=80&width=80",
        title: "Pasta Carbonara",
        price: 13.99,
        type: "Non Veg",
        category: "Main Course",
        quantity: 1,
      },
    ],
  },
  {
    id: 8,
    number: "T8",
    capacity: 6,
    status: "reserved",
    reservation: {
      name: "Emily Johnson",
      time: new Date(Date.now() + 60 * 60000), // 60 minutes from now
      guests: 4,
      phone: "555-987-6543",
    },
  },
  {
    id: 9,
    number: "T9",
    capacity: 2,
    status: "available",
  },
  {
    id: 10,
    number: "T10",
    capacity: 4,
    status: "available",
  },
  {
    id: 11,
    number: "T11",
    capacity: 4,
    status: "occupied",
    occupiedSince: new Date(Date.now() - 60 * 60000), // 60 minutes ago
    orders: [
      {
        id: 8,
        image: "/placeholder.svg?height=80&width=80",
        title: "Chicken Tikka Masala",
        price: 16.99,
        type: "Non Veg",
        category: "Main Course",
        quantity: 1,
      },
      {
        id: 9,
        image: "/placeholder.svg?height=80&width=80",
        title: "Garlic Naan",
        price: 3.99,
        type: "Veg",
        category: "Sides",
        quantity: 2,
      },
    ],
  },
  {
    id: 12,
    number: "T12",
    capacity: 8,
    status: "reserved",
    reservation: {
      name: "Robert Davis",
      time: new Date(Date.now() + 120 * 60000), // 120 minutes from now
      guests: 7,
      phone: "555-456-7890",
    },
  },
]

// Sample data for floor sections
const floorSections: FloorSection[] = [
  { id: "all", name: "All Tables" },
  { id: "main", name: "Main Floor" },
  { id: "patio", name: "Patio" },
  { id: "bar", name: "Bar Area" },
  { id: "private", name: "Private Room" },
]

export default function TableServicesPage() {
  // Custom scrollbar styles with auto-hide functionality
  const scrollbarStyles = `
.auto-hide-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
}

.auto-hide-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.auto-hide-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.auto-hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.auto-hide-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
}

.auto-hide-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* For Firefox */
.auto-hide-scrollbar:hover {
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}
`
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [tables, setTables] = useState<TableItem[]>(tablesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null)
  const [isTableDetailsOpen, setIsTableDetailsOpen] = useState(false)
  const [isAddTableOpen, setIsAddTableOpen] = useState(false)
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)

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

  // Filter tables based on search query, status filter, and section filter
  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      searchQuery === "" ||
      table.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (table.reservation?.name && table.reservation.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || table.status === statusFilter

    // For this demo, we're not actually filtering by section since we don't have section data
    // In a real app, you would add section data to each table and filter accordingly
    const matchesSection = sectionFilter === "all" || true

    return matchesSearch && matchesStatus && matchesSection
  })

  // Get status badge color
  const getStatusBadge = (status: TableItem["status"]) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Available
          </Badge>
        )
      case "occupied":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Occupied
          </Badge>
        )
      case "reserved":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Reserved
          </Badge>
        )
      case "cleaning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Cleaning
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Calculate time elapsed since table was occupied
  const getTimeElapsed = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60

    if (hours > 0) {
      return `${hours}h ${mins}m`
    } else {
      return `${mins}m`
    }
  }

  // Calculate total bill for a table
  const calculateTotal = (orders: CartItem[] | undefined) => {
    if (!orders) return 0
    return orders.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Add a new table
  const addTable = (tableData: Omit<TableItem, "id">) => {
    const newTable: TableItem = {
      ...tableData,
      id: Math.max(...tables.map((t) => t.id)) + 1,
    }
    setTables([...tables, newTable])
    setIsAddTableOpen(false)
  }

  // Update table status
  const updateTableStatus = (tableId: number, status: TableItem["status"]) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          const updatedTable = { ...table, status }

          // If table is now occupied, set the occupied time
          if (status === "occupied") {
            updatedTable.occupiedSince = new Date()
          }

          // If table is now available, clear orders and occupied time
          if (status === "available" || status === "cleaning") {
            delete updatedTable.orders
            delete updatedTable.occupiedSince
          }

          return updatedTable
        }
        return table
      }),
    )
  }

  // Add order to table
  const addOrderToTable = (tableId: number, order: CartItem) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          const updatedTable = { ...table }

          // If table has no orders yet, initialize the array
          if (!updatedTable.orders) {
            updatedTable.orders = []
          }

          // Check if the item already exists in the order
          const existingItemIndex = updatedTable.orders.findIndex((item) => item.id === order.id)

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            updatedTable.orders[existingItemIndex].quantity += order.quantity
          } else {
            // Add new item
            updatedTable.orders.push(order)
          }

          // Ensure table is marked as occupied
          if (updatedTable.status !== "occupied") {
            updatedTable.status = "occupied"
            updatedTable.occupiedSince = new Date()
          }

          return updatedTable
        }
        return table
      }),
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <style jsx global>
        {scrollbarStyles}
      </style>
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
            <h1 className="text-xl font-bold">Table Services</h1>
            <p className="text-sm text-gray-500 hidden sm:block">Manage tables and dine-in orders</p>
          </div>
          <Button onClick={() => setIsAddTableOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          <div className="flex flex-col h-full">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tables..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sectionFilter} onValueChange={setSectionFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by section" />
                  </SelectTrigger>
                  <SelectContent>
                    {floorSections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table Grid */}
            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="grid" className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-gray-500">
                    {filteredTables.length} table{filteredTables.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="grid" className="h-full overflow-auto auto-hide-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-6">
                      {filteredTables.map((table) => (
                        <Card
                          key={table.id}
                          className={`cursor-pointer hover:shadow-md transition-shadow ${
                            table.status === "available"
                              ? "border-green-200"
                              : table.status === "occupied"
                                ? "border-red-200"
                                : table.status === "reserved"
                                  ? "border-blue-200"
                                  : "border-yellow-200"
                          }`}
                          onClick={() => {
                            setSelectedTable(table)
                            setIsTableDetailsOpen(true)
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="text-xl font-bold">{table.number}</div>
                              {getStatusBadge(table.status)}
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{table.capacity} seats</span>
                              </div>
                              {table.status === "occupied" && table.occupiedSince && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span>{getTimeElapsed(table.occupiedSince)}</span>
                                </div>
                              )}
                              {table.status === "reserved" && table.reservation && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span>{table.reservation.name}</span>
                                </div>
                              )}
                              {table.orders && (
                                <div className="flex items-center gap-1">
                                  <Utensils className="h-4 w-4 text-gray-500" />
                                  <span>{table.orders.length} items</span>
                                </div>
                              )}
                              {table.orders && (
                                <div className="flex items-center gap-1 font-medium">
                                  <DollarSign className="h-4 w-4 text-gray-500" />
                                  <span>${calculateTotal(table.orders).toFixed(2)}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="list" className="h-full overflow-auto auto-hide-scrollbar">
                    <div className="rounded-md border bg-white overflow-hidden mb-6">
                      <div className="hidden md:grid md:grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                        <div>Table</div>
                        <div>Status</div>
                        <div>Capacity</div>
                        <div>Time</div>
                        <div>Order Total</div>
                        <div className="text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {filteredTables.length > 0 ? (
                          filteredTables.map((table) => (
                            <div
                              key={table.id}
                              className="md:grid md:grid-cols-6 p-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => {
                                setSelectedTable(table)
                                setIsTableDetailsOpen(true)
                              }}
                            >
                              {/* Mobile view */}
                              <div className="md:hidden space-y-2 mb-2">
                                <div className="flex justify-between">
                                  <div className="font-medium text-lg">{table.number}</div>
                                  {getStatusBadge(table.status)}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span>{table.capacity} seats</span>
                                  </div>
                                  {table.status === "occupied" && table.occupiedSince && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span>{getTimeElapsed(table.occupiedSince)}</span>
                                    </div>
                                  )}
                                  {table.status === "reserved" && table.reservation && (
                                    <div className="flex items-center gap-1 col-span-2">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span>
                                        {table.reservation.name} at{" "}
                                        {table.reservation.time.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                  )}
                                  {table.orders && (
                                    <div className="flex items-center gap-1">
                                      <Utensils className="h-4 w-4 text-gray-500" />
                                      <span>{table.orders.length} items</span>
                                    </div>
                                  )}
                                  {table.orders && (
                                    <div className="flex items-center gap-1 font-medium">
                                      <DollarSign className="h-4 w-4 text-gray-500" />
                                      <span>${calculateTotal(table.orders).toFixed(2)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Desktop view */}
                              <div className="hidden md:block font-medium">{table.number}</div>
                              <div className="hidden md:block">{getStatusBadge(table.status)}</div>
                              <div className="hidden md:block">{table.capacity} seats</div>
                              <div className="hidden md:block">
                                {table.status === "occupied" && table.occupiedSince
                                  ? getTimeElapsed(table.occupiedSince)
                                  : table.status === "reserved" && table.reservation
                                    ? table.reservation.time.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : "-"}
                              </div>
                              <div className="hidden md:block">
                                {table.orders ? `$${calculateTotal(table.orders).toFixed(2)}` : "-"}
                              </div>
                              <div className="hidden md:flex justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedTable(table)
                                        setIsTableDetailsOpen(true)
                                      }}
                                    >
                                      View Details
                                    </DropdownMenuItem>
                                    {table.status === "available" && (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          updateTableStatus(table.id, "occupied")
                                        }}
                                      >
                                        Mark as Occupied
                                      </DropdownMenuItem>
                                    )}
                                    {table.status === "occupied" && (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedTable(table)
                                          setIsAddOrderOpen(true)
                                        }}
                                      >
                                        Add Order
                                      </DropdownMenuItem>
                                    )}
                                    {table.status === "occupied" && (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          updateTableStatus(table.id, "cleaning")
                                        }}
                                      >
                                        Clear Table
                                      </DropdownMenuItem>
                                    )}
                                    {table.status === "cleaning" && (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          updateTableStatus(table.id, "available")
                                        }}
                                      >
                                        Mark as Available
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            No tables found matching your filters. Try adjusting your search criteria.
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Table Details Sheet */}
      <Sheet open={isTableDetailsOpen} onOpenChange={setIsTableDetailsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Table {selectedTable?.number}</SheetTitle>
          </SheetHeader>
          {selectedTable && (
            <div className="py-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{selectedTable.capacity} seats</span>
                </div>
                {getStatusBadge(selectedTable.status)}
              </div>

              {selectedTable.status === "reserved" && selectedTable.reservation && (
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Reservation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{selectedTable.reservation.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span>
                        {selectedTable.reservation.time.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span>{selectedTable.reservation.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span>{selectedTable.reservation.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedTable.status === "occupied" && (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Table Information</h3>
                    <div className="space-y-2 text-sm">
                      {selectedTable.occupiedSince && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied Since:</span>
                          <span>
                            {selectedTable.occupiedSince.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            ({getTimeElapsed(selectedTable.occupiedSince)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Current Order</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          setIsAddOrderOpen(true)
                        }}
                      >
                        Add Items
                      </Button>
                    </div>

                    {selectedTable.orders && selectedTable.orders.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTable.orders.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{item.title}</h4>
                                <span className="text-sm">{item.quantity}x</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-sm text-gray-500">${item.price.toFixed(2)}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${calculateTotal(selectedTable.orders).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">No items ordered yet</div>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-3">
                {selectedTable.status === "available" && (
                  <Button className="w-full" onClick={() => updateTableStatus(selectedTable.id, "occupied")}>
                    Seat Guests
                  </Button>
                )}

                {selectedTable.status === "occupied" && (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsAddOrderOpen(true)
                      }}
                    >
                      Add to Order
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // In a real app, this would open a payment screen
                        alert(`Processing payment of $${calculateTotal(selectedTable.orders).toFixed(2)}`)
                      }}
                    >
                      Process Payment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => updateTableStatus(selectedTable.id, "cleaning")}
                    >
                      Clear Table
                    </Button>
                  </>
                )}

                {selectedTable.status === "reserved" && (
                  <>
                    <Button className="w-full" onClick={() => updateTableStatus(selectedTable.id, "occupied")}>
                      Seat Reservation
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => updateTableStatus(selectedTable.id, "available")}
                    >
                      Cancel Reservation
                    </Button>
                  </>
                )}

                {selectedTable.status === "cleaning" && (
                  <Button className="w-full" onClick={() => updateTableStatus(selectedTable.id, "available")}>
                    Mark as Available
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Table Dialog */}
      <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Table</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="table-number">Table Number</Label>
              <Input id="table-number" placeholder="e.g., T13" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-capacity">Seating Capacity</Label>
              <Input id="table-capacity" type="number" min="1" defaultValue="4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-section">Section</Label>
              <Select defaultValue="main">
                <SelectTrigger id="table-section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Floor</SelectItem>
                  <SelectItem value="patio">Patio</SelectItem>
                  <SelectItem value="bar">Bar Area</SelectItem>
                  <SelectItem value="private">Private Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-status">Initial Status</Label>
              <Select defaultValue="available">
                <SelectTrigger id="table-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTableOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const tableNumber = (document.getElementById("table-number") as HTMLInputElement).value
                const capacity = Number.parseInt((document.getElementById("table-capacity") as HTMLInputElement).value)
                const status = (document.getElementById("table-status") as HTMLSelectElement)
                  .value as TableItem["status"]

                if (tableNumber && !isNaN(capacity)) {
                  addTable({
                    number: tableNumber,
                    capacity,
                    status,
                  })
                }
              }}
            >
              Add Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Order Dialog */}
      <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Order to Table {selectedTable?.number}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Quick Add Items</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 101, title: "Margherita Pizza", price: 12.99, type: "Veg" },
                  { id: 102, title: "Chicken Wings", price: 9.99, type: "Non Veg" },
                  { id: 103, title: "Caesar Salad", price: 8.99, type: "Veg" },
                  { id: 104, title: "Soda", price: 2.99, type: "Veg" },
                  { id: 105, title: "French Fries", price: 4.99, type: "Veg" },
                  { id: 106, title: "Burger", price: 13.99, type: "Non Veg" },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="outline"
                    className="h-auto py-2 px-3 justify-start"
                    onClick={() => {
                      if (selectedTable) {
                        addOrderToTable(selectedTable.id, {
                          ...item,
                          image: "/placeholder.svg?height=80&width=80",
                          category: "Quick Add",
                          quantity: 1,
                        })
                        setIsAddOrderOpen(false)
                      }
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  // In a real app, this would open the full menu
                  alert("This would open the full menu in a real application")
                }}
              >
                Open Full Menu
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOrderOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

