"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { JSX } from "react"

// Define types for the category data
interface Category {
  label: string
  items: string
}

// Define props interface for the component
interface CategoryFilterProps {
  activeCategory: string
  setActiveCategoryAction: (category: string) => void
  isSearching: boolean
}

// Define categories with their item counts
const categories: Category[] = [
  { label: "All", items: "235 Items" },
  { label: "Breakfast", items: "19 Items" },
  { label: "Soups", items: "8 Items" },
  { label: "Pasta", items: "14 Items" },
  { label: "Main Course", items: "27 Items" },
  { label: "Burgers", items: "13 Items" },
]

export function CategoryFilter({ activeCategory, setActiveCategoryAction, isSearching }: CategoryFilterProps): JSX.Element {
  // Handle category selection
  const handleCategoryClick = (category: string): void => {
    setActiveCategoryAction(category)
  }

  return (
    <div className="mb-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center h-10 gap-2 pb-1 mb-2">
          {categories.map((category) => (
            <button
              key={category.label}
              className={`h-8 px-4 rounded-full text-center inline-flex items-center justify-center
                ${
                  activeCategory === category.label && !isSearching
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } 
                border border-gray-200 cursor-pointer transition-all
                ${isSearching ? "opacity-70" : ""}`}
              onClick={() => handleCategoryClick(category.label)}
            >
              <span className="text-sm">{category.label}</span>
              <span
                className={`ml-1.5 text-xs ${activeCategory === category.label && !isSearching ? "text-primary-foreground/80" : "text-gray-500"}`}
              >
                ({category.items.split(" ")[0]})
              </span>
            </button>
          ))}
        </div>
        {isSearching && (
          <div className="mt-1 text-xs text-gray-500 italic">Search results are shown across all categories</div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

