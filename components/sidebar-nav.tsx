"use client"

import {
  MenuIcon,
  PanelLeft,
  Utensils,
  CalendarRange,
  Truck,
  NotepadText,
  Settings,
  LogOut,
  ChevronLeft,
  ChartNoAxesCombined,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: NotepadText, label: "Menu", href: "/" },
  { icon: Utensils, label: "Table Services", href: "/table-services" },
  { icon: CalendarRange, label: "Reservation", color: "text-primary", href: "/reservations" },
  { icon: Truck, label: "Delivery", href: "/delivery" },
  { icon: ChartNoAxesCombined, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface SidebarNavProps {
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
  hideToggle?: boolean
}

export function SidebarNav({
  collapsed: propCollapsed,
  setCollapsed: propSetCollapsed,
  hideToggle = true,
}: SidebarNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Use either props or internal state
  const collapsed = propCollapsed !== undefined ? propCollapsed : internalCollapsed
  const setCollapsed = propSetCollapsed || setInternalCollapsed

  // Check if screen is mobile and collapse sidebar automatically
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [setCollapsed])

  return (
    <div
      className={`${
        collapsed ? "w-0 md:w-16" : "w-64"
      } border-r h-screen bg-white transition-all duration-300 fixed md:relative ${isMobile ? "z-50 shadow-xl" : ""}`}
    >
      {/* Mobile hamburger button - fixed position */}
      {isMobile && collapsed && !hideToggle && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 h-8 w-8 rounded-md bg-white border shadow-sm"
          onClick={() => setCollapsed(false)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      )}

      <div className={`p-4 h-full flex flex-col ${collapsed && isMobile ? "hidden" : "block"}`}>
        {/* Header with logo and close button */}
        <div className={`flex items-center gap-2 mb-8 ${collapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-8 h-8"/>
            {!collapsed && <span className="font-semibold">Food Park</span>}
          </div>

          {/* Close button in header - only when expanded and not on mobile */}
          {!collapsed && !isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(true)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

            return (
              <Button
                key={index}
                variant={isActive ? "secondary" : "ghost"}
                className={`${
                  collapsed ? "justify-center w-8 h-8 p-0 mx-auto" : "w-full justify-start"
                } ${isActive ? "bg-gray-100 font-medium text-primary" : "text-gray-600"}`}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={`${collapsed ? "" : "mr-2"} h-4 w-4`} />
                  {!collapsed && item.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Toggle button above logout - only when collapsed and not on mobile */}
        {collapsed && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0 mx-auto absolute bottom-16 left-4 mb-2"
            onClick={() => setCollapsed(false)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          className={`${
            collapsed ? "justify-center w-8 h-8 p-0" : "w-full justify-start"
          } text-gray-600 mt-auto mb-4 ${collapsed ? "mx-auto" : ""}`}
        >
          <LogOut className={`${collapsed ? "" : "mr-2"} h-4 w-4`} />
          {!collapsed && "Logout"}
        </Button>

        {/* Close button for mobile */}
        {!collapsed && isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-40"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

