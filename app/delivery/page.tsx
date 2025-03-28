"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  MenuIcon,
  Search,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Bike,
  ClipboardList,
  User,
  DollarSign,
} from "lucide-react"
import { format, addMinutes, addHours } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

// Define types for delivery data
interface DeliveryDriver {
  id: string
  name: string
  status: "available" | "busy" | "offline"
  phone: string
  activeOrders: number
  totalDeliveries: number
  rating: number
  vehicle: string
}

interface DeliveryOrder {
  id: string
  customer: {
    name: string
    address: string
    phone: string
    coordinates: [number, number]
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  status: "pending" | "preparing" | "ready" | "in-transit" | "delivered" | "cancelled"
  orderTime: Date
  estimatedDelivery: Date
  actualDelivery?: Date
  driver?: string
  total: number
  paymentMethod: "cash" | "card" | "online"
  specialInstructions?: string
  distance: number
}

interface DeliveryZone {
  id: string
  name: string
  radius: number
  fee: number
  estimatedTime: number
  active: boolean
}

// Sample data for delivery drivers
const driversData: DeliveryDriver[] = [
  {
    id: "D001",
    name: "Michael Johnson",
    status: "available",
    phone: "555-123-4567",
    activeOrders: 0,
    totalDeliveries: 142,
    rating: 4.8,
    vehicle: "Motorcycle",
  },
  {
    id: "D002",
    name: "Sarah Williams",
    status: "busy",
    phone: "555-234-5678",
    activeOrders: 2,
    totalDeliveries: 98,
    rating: 4.7,
    vehicle: "Car",
  },
  {
    id: "D003",
    name: "David Brown",
    status: "available",
    phone: "555-345-6789",
    activeOrders: 0,
    totalDeliveries: 215,
    rating: 4.9,
    vehicle: "Motorcycle",
  },
  {
    id: "D004",
    name: "Emily Davis",
    status: "offline",
    phone: "555-456-7890",
    activeOrders: 0,
    totalDeliveries: 76,
    rating: 4.6,
    vehicle: "Car",
  },
  {
    id: "D005",
    name: "James Wilson",
    status: "busy",
    phone: "555-567-8901",
    activeOrders: 1,
    totalDeliveries: 124,
    rating: 4.5,
    vehicle: "Motorcycle",
  },
]

// Sample data for delivery orders
const ordersData: DeliveryOrder[] = [
  {
    id: "ORD-5782",
    customer: {
      name: "John Smith",
      address: "123 Main St, Apt 4B, Foodville",
      phone: "555-987-6543",
      coordinates: [40.7128, -74.006],
    },
    items: [
      { name: "Margherita Pizza (Large)", quantity: 1, price: 14.99 },
      { name: "Garlic Breadsticks", quantity: 1, price: 4.99 },
      { name: "Coke (2L)", quantity: 1, price: 3.49 },
    ],
    status: "in-transit",
    orderTime: new Date(),
    estimatedDelivery: addMinutes(new Date(), 15),
    driver: "D002",
    total: 23.47,
    paymentMethod: "card",
    specialInstructions: "Please ring doorbell twice",
    distance: 2.3,
  },
  {
    id: "ORD-5783",
    customer: {
      name: "Emma Johnson",
      address: "456 Oak Ave, Foodville",
      phone: "555-123-7890",
      coordinates: [40.7282, -74.0776],
    },
    items: [
      { name: "Chicken Tikka Masala", quantity: 1, price: 16.99 },
      { name: "Garlic Naan", quantity: 2, price: 2.99 },
      { name: "Mango Lassi", quantity: 1, price: 4.49 },
    ],
    status: "preparing",
    orderTime: new Date(),
    estimatedDelivery: addMinutes(new Date(), 35),
    total: 27.46,
    paymentMethod: "online",
    distance: 3.1,
  },
  {
    id: "ORD-5784",
    customer: {
      name: "Robert Davis",
      address: "789 Pine St, Foodville",
      phone: "555-456-1230",
      coordinates: [40.7382, -74.0876],
    },
    items: [
      { name: "Double Cheeseburger", quantity: 2, price: 12.99 },
      { name: "French Fries (Large)", quantity: 1, price: 4.99 },
      { name: "Chocolate Milkshake", quantity: 2, price: 5.49 },
    ],
    status: "ready",
    orderTime: new Date(),
    estimatedDelivery: addMinutes(new Date(), 25),
    total: 41.95,
    paymentMethod: "cash",
    specialInstructions: "Extra ketchup packets please",
    distance: 1.8,
  },
  {
    id: "ORD-5785",
    customer: {
      name: "Sophia Martinez",
      address: "321 Elm St, Foodville",
      phone: "555-789-4560",
      coordinates: [40.7482, -74.0976],
    },
    items: [
      { name: "Vegetable Pad Thai", quantity: 1, price: 13.99 },
      { name: "Spring Rolls", quantity: 1, price: 5.99 },
      { name: "Thai Iced Tea", quantity: 1, price: 3.99 },
    ],
    status: "pending",
    orderTime: new Date(),
    estimatedDelivery: addMinutes(new Date(), 45),
    total: 23.97,
    paymentMethod: "card",
    distance: 4.2,
  },
  {
    id: "ORD-5786",
    customer: {
      name: "William Brown",
      address: "654 Maple Ave, Foodville",
      phone: "555-321-6540",
      coordinates: [40.7582, -74.1076],
    },
    items: [
      { name: "Pepperoni Pizza (Medium)", quantity: 1, price: 12.99 },
      { name: "Buffalo Wings (10pc)", quantity: 1, price: 9.99 },
      { name: "Sprite (1L)", quantity: 1, price: 2.99 },
    ],
    status: "in-transit",
    orderTime: new Date(),
    estimatedDelivery: addMinutes(new Date(), 10),
    driver: "D005",
    total: 25.97,
    paymentMethod: "online",
    distance: 2.7,
  },
  {
    id: "ORD-5787",
    customer: {
      name: "Olivia Wilson",
      address: "987 Cedar St, Foodville",
      phone: "555-654-3210",
      coordinates: [40.7682, -74.1176],
    },
    items: [
      { name: "Sushi Combo", quantity: 1, price: 24.99 },
      { name: "Miso Soup", quantity: 1, price: 3.49 },
      { name: "Green Tea", quantity: 1, price: 2.49 },
    ],
    status: "delivered",
    orderTime: addHours(new Date(), -1),
    estimatedDelivery: addHours(new Date(), -1),
    actualDelivery: addMinutes(addHours(new Date(), -1), 35),
    driver: "D003",
    total: 30.97,
    paymentMethod: "card",
    distance: 3.5,
  },
  {
    id: "ORD-5788",
    customer: {
      name: "James Taylor",
      address: "135 Birch St, Foodville",
      phone: "555-987-1234",
      coordinates: [40.7782, -74.1276],
    },
    items: [
      { name: "Beef Burrito", quantity: 1, price: 10.99 },
      { name: "Chips & Guacamole", quantity: 1, price: 5.99 },
      { name: "Mexican Coke", quantity: 1, price: 3.49 },
    ],
    status: "cancelled",
    orderTime: addHours(new Date(), -2),
    estimatedDelivery: addHours(new Date(), -1),
    total: 20.47,
    paymentMethod: "online",
    specialInstructions: "No cilantro please",
    distance: 2.9,
  },
]

// Sample data for delivery zones
const zonesData: DeliveryZone[] = [
  {
    id: "Z1",
    name: "Downtown",
    radius: 3,
    fee: 2.99,
    estimatedTime: 20,
    active: true,
  },
  {
    id: "Z2",
    name: "Midtown",
    radius: 5,
    fee: 3.99,
    estimatedTime: 30,
    active: true,
  },
  {
    id: "Z3",
    name: "Uptown",
    radius: 7,
    fee: 4.99,
    estimatedTime: 40,
    active: true,
  },
  {
    id: "Z4",
    name: "Suburbs",
    radius: 10,
    fee: 5.99,
    estimatedTime: 50,
    active: false,
  },
]

export default function DeliveryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [drivers, setDrivers] = useState<DeliveryDriver[]>(driversData)
  const [orders, setOrders] = useState<DeliveryOrder[]>(ordersData)
  const [zones, setZones] = useState<DeliveryZone[]>(zonesData)
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false)
  const [isNewZoneOpen, setIsNewZoneOpen] = useState(false)

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

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) => {
    return (
      searchQuery === "" ||
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Assign driver to order
  const assignDriver = (orderId: string, driverId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, driver: driverId, status: "in-transit" as const } : order,
      ),
    )

    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === driverId ? { ...driver, status: "busy" as const, activeOrders: driver.activeOrders + 1 } : driver,
      ),
    )

    setIsAssignDriverOpen(false)
  }

  // Update order status
  const updateOrderStatus = (orderId: string, status: DeliveryOrder["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status }

          // If order is delivered, update the actual delivery time
          if (status === "delivered") {
            updatedOrder.actualDelivery = new Date()
          }

          // If order is cancelled or delivered and had a driver, update driver status
          if ((status === "cancelled" || status === "delivered") && order.driver) {
            setDrivers((prevDrivers) =>
              prevDrivers.map((driver) =>
                driver.id === order.driver
                  ? {
                      ...driver,
                      activeOrders: Math.max(0, driver.activeOrders - 1),
                      status: driver.activeOrders <= 1 ? ("available" as const) : ("busy" as const),
                      totalDeliveries: status === "delivered" ? driver.totalDeliveries + 1 : driver.totalDeliveries,
                    }
                  : driver,
              ),
            )
          }

          return updatedOrder
        }
        return order
      }),
    )
  }

  // Add new delivery zone
  const addDeliveryZone = (zone: Omit<DeliveryZone, "id">) => {
    const newZone: DeliveryZone = {
      ...zone,
      id: `Z${zones.length + 1}`,
    }

    setZones([...zones, newZone])
    setIsNewZoneOpen(false)
  }

  // Toggle zone active status
  const toggleZoneStatus = (zoneId: string) => {
    setZones((prevZones) => prevZones.map((zone) => (zone.id === zoneId ? { ...zone, active: !zone.active } : zone)))
  }

  // Get status badge color
  const getStatusBadge = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-gray-100">
            Pending
          </Badge>
        )
      case "preparing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Preparing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Ready
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get driver status badge color
  const getDriverStatusBadge = (status: DeliveryDriver["status"]) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Available
          </Badge>
        )
      case "busy":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Busy
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <>
      <style jsx global>
        {scrollbarStyles}
      </style>
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
              <h1 className="text-xl font-bold">Delivery Management</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Track and manage delivery orders and drivers</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6">
            <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              {/* Mobile dropdown for very small screens */}
              <div className="block sm:hidden mb-4">
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orders">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        <span>Orders</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="drivers">
                      <div className="flex items-center gap-2">
                        <Bike className="h-4 w-4" />
                        <span>Drivers</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="zones">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Delivery Zones</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs for larger screens */}
              <div className="hidden sm:block mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="drivers" className="flex items-center gap-2">
                    <Bike className="h-4 w-4" />
                    <span>Drivers</span>
                  </TabsTrigger>
                  <TabsTrigger value="zones" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Delivery Zones</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto auto-hide-scrollbar">
                <div className="pb-6">
                  {/* Orders Tab */}
                  <TabsContent value="orders" className="mt-0">
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search orders..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Orders</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="preparing">Preparing</SelectItem>
                              <SelectItem value="ready">Ready for Delivery</SelectItem>
                              <SelectItem value="in-transit">In Transit</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Delivery Orders</CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {filteredOrders.length > 0 ? (
                            <div className="divide-y">
                              {filteredOrders.map((order) => (
                                <div
                                  key={order.id}
                                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                  onClick={() => {
                                    setSelectedOrder(order)
                                    setIsOrderDetailsOpen(true)
                                  }}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="font-medium">{order.customer.name}</div>
                                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span className="line-clamp-1">{order.customer.address}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <div className="font-medium">{order.id}</div>
                                      <div className="mt-1">{getStatusBadge(order.status)}</div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-3">
                                      <div className="text-sm flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                                        <span>{format(order.estimatedDelivery, "h:mm a")}</span>
                                      </div>
                                      <div className="text-sm flex items-center gap-1">
                                        <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                                        <span>${order.total.toFixed(2)}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                              <p className="text-lg font-medium mb-2">No orders found</p>
                              <p className="text-sm">Try a different search term or filter</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Drivers Tab */}
                  <TabsContent value="drivers" className="mt-0">
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search drivers..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Driver
                        </Button>
                      </div>

                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Delivery Drivers</CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {filteredDrivers.length > 0 ? (
                            <div className="divide-y">
                              {filteredDrivers.map((driver) => (
                                <div key={driver.id} className="p-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="font-medium">{driver.name}</div>
                                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>{driver.phone}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <div className="font-medium">{driver.id}</div>
                                      <div className="mt-1">{getDriverStatusBadge(driver.status)}</div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-3">
                                      <div className="text-sm flex items-center gap-1">
                                        <Bike className="h-3.5 w-3.5 text-gray-500" />
                                        <span>{driver.vehicle}</span>
                                      </div>
                                      <div className="text-sm flex items-center gap-1">
                                        <ClipboardList className="h-3.5 w-3.5 text-gray-500" />
                                        <span>{driver.activeOrders} active</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{driver.rating}</span>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                              <p className="text-lg font-medium mb-2">No drivers found</p>
                              <p className="text-sm">Try a different search term</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Delivery Zones Tab */}
                  <TabsContent value="zones" className="mt-0">
                    <div className="flex flex-col p-1">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Delivery Zones</h2>
                        <Button onClick={() => setIsNewZoneOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Zone
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {zones.map((zone) => (
                              <Card
                                key={zone.id}
                                className={`border ${zone.active ? "border-green-200" : "border-gray-200"}`}
                              >
                                <CardHeader className="p-4 pb-2">
                                  <div className="flex justify-between items-center">
                                    <CardTitle className="text-base">{zone.name}</CardTitle>
                                    <Switch checked={zone.active} onCheckedChange={() => toggleZoneStatus(zone.id)} />
                                  </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-500">Radius:</div>
                                    <div>{zone.radius} miles</div>
                                    <div className="text-gray-500">Delivery Fee:</div>
                                    <div>${zone.fee.toFixed(2)}</div>
                                    <div className="text-gray-500">Est. Time:</div>
                                    <div>{zone.estimatedTime} minutes</div>
                                  </div>
                                  <div className="flex justify-end mt-4">
                                    <Button variant="outline" size="sm">
                                      Edit Zone
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">{format(selectedOrder.orderTime, "MMM d, yyyy h:mm a")}</div>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium mb-1">Customer Information</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.customer.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Order Items</div>
                  <div className="border rounded-lg divide-y">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="p-3 flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x</span> {item.name}
                        </div>
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                    <div className="p-3 flex justify-between font-medium">
                      <div>Total</div>
                      <div>${selectedOrder.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium mb-1">Delivery Details</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Distance:</span>
                        <span>{selectedOrder.distance} miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Est. Delivery:</span>
                        <span>{format(selectedOrder.estimatedDelivery, "h:mm a")}</span>
                      </div>
                      {selectedOrder.actualDelivery && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Actual Delivery:</span>
                          <span>{format(selectedOrder.actualDelivery, "h:mm a")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium mb-1">Payment Information</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Method:</span>
                        <span className="capitalize">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="text-green-600">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.specialInstructions && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    <div className="font-medium mb-1 text-yellow-800">Special Instructions</div>
                    <div className="text-sm">{selectedOrder.specialInstructions}</div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    {selectedOrder.driver ? (
                      <div className="text-sm">
                        <span className="text-gray-500">Driver:</span>{" "}
                        {drivers.find((d) => d.id === selectedOrder.driver)?.name || "Unknown"}
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-600">No driver assigned</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {selectedOrder.status === "ready" && (
                      <Button variant="outline" onClick={() => setIsAssignDriverOpen(true)}>
                        Assign Driver
                      </Button>
                    )}
                    {(selectedOrder.status === "pending" || selectedOrder.status === "preparing") && (
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "cancelled")
                          setIsOrderDetailsOpen(false)
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                    {selectedOrder.status === "in-transit" && (
                      <Button
                        variant="outline"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "delivered")
                          setIsOrderDetailsOpen(false)
                        }}
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    {selectedOrder.status === "pending" && (
                      <Button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "preparing")
                          setIsOrderDetailsOpen(false)
                        }}
                      >
                        Start Preparing
                      </Button>
                    )}
                    {selectedOrder.status === "preparing" && (
                      <Button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "ready")
                          setIsOrderDetailsOpen(false)
                        }}
                      >
                        Ready for Delivery
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Assign Driver Dialog */}
        <Dialog open={isAssignDriverOpen} onOpenChange={setIsAssignDriverOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Assign Driver to Order {selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-sm text-gray-500 mb-2">
                Select an available driver to assign to this delivery order
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto auto-hide-scrollbar">
                {drivers
                  .filter((driver) => driver.status === "available")
                  .map((driver) => (
                    <div
                      key={driver.id}
                      className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectedOrder && assignDriver(selectedOrder.id, driver.id)}
                    >
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-gray-500">
                          {driver.vehicle} • {driver.rating} ★
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </div>
                  ))}
                {drivers.filter((driver) => driver.status === "available").length === 0 && (
                  <div className="text-center p-4 text-gray-500">No available drivers at the moment</div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignDriverOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Delivery Zone Dialog */}
        <Dialog open={isNewZoneOpen} onOpenChange={setIsNewZoneOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Delivery Zone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="zone-name">Zone Name</Label>
                <Input id="zone-name" placeholder="e.g., Downtown, West Side" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone-radius">Radius (miles)</Label>
                  <Input id="zone-radius" type="number" min="1" step="0.1" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone-fee">Delivery Fee ($)</Label>
                  <Input id="zone-fee" type="number" min="0" step="0.01" defaultValue="2.99" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-time">Estimated Delivery Time (minutes)</Label>
                <Input id="zone-time" type="number" min="5" step="5" defaultValue="30" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="zone-active" defaultChecked />
                <Label htmlFor="zone-active">Zone Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewZoneOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const name = (document.getElementById("zone-name") as HTMLInputElement).value
                  const radius = Number.parseFloat((document.getElementById("zone-radius") as HTMLInputElement).value)
                  const fee = Number.parseFloat((document.getElementById("zone-fee") as HTMLInputElement).value)
                  const estimatedTime = Number.parseInt(
                    (document.getElementById("zone-time") as HTMLInputElement).value,
                  )
                  const active = (document.getElementById("zone-active") as HTMLInputElement).checked

                  if (name && !isNaN(radius) && !isNaN(fee) && !isNaN(estimatedTime)) {
                    addDeliveryZone({ name, radius, fee, estimatedTime, active })
                  }
                }}
              >
                Add Zone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

