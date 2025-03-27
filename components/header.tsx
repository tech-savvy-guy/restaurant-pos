"use client"

import { Search, MenuIcon, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, type ChangeEvent } from "react"
import type { ReactElement } from "react"

// Define props interface for the component
interface HeaderProps {
  toggleSidebarAction: () => void
  openOrderSheetAction: () => void
  searchQuery: string
  setSearchQueryAction: (query: string) => void
}

export function Header({ toggleSidebarAction, openOrderSheetAction, searchQuery, setSearchQueryAction }: HeaderProps): ReactElement {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQueryAction(e.target.value)
  }

  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b">
      {isMobile && (
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent" onClick={toggleSidebarAction}>
          <MenuIcon className="h-5 w-5" />
        </Button>
      )}

      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Product here..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Button variant="default" onClick={openOrderSheetAction}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        View Order
      </Button>
    </div>
  )
}

