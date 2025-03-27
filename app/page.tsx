"use client"

import { SidebarNav } from "../components/sidebar-nav"
import { Header } from "../components/header"
import { CategoryFilter } from "../components/category-filter"
import { FoodGrid, type FoodItem } from "../components/food-grid"
import { Cart, type CartItem } from "../components/cart"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define dining mode type
type DiningMode = "dine-in" | "take-away" | "delivery"

// Sample food items data
const foodItemsData: FoodItem[] = [
  {
    id: 1,
    image: "/food-items/pizza.jpg",
    title: "Vegetable Pizza with Cheese",
    price: 17.99,
    discount: 20,
    type: "Veg",
    category: "Main Course",
  },
  {
    id: 2,
    image: "/food-items/burger.jpg",
    title: "Cheese Meat Burger with Chips",
    price: 23.99,
    type: "Non Veg",
    category: "Burgers",
  },
  {
    id: 3,
    image: "/food-items/chilli-chicken.jpg",
    title: "Spicy Chilli Chicken",
    price: 14.99,
    type: "Non Veg",
    category: "Main Course",
  },
  {
    id: 4,
    image: "/food-items/onion-dosa.jpg",
    title: "Onion Dosa with Coconut Chutney",
    price: 12.99,
    type: "Veg",
    category: "Breakfast",
  },
  {
    id: 5,
    image: "/food-items/north-indian-thali.webp",
    title: "North Indian Thali",
    price: 9.99,
    type: "Veg",
    category: "Main Course",
  },
  {
    id: 6,
    image: "/food-items/paneer.jpg",
    title: "Paneer Butter Masala with Naan",
    price: 10.59,
    discount: 20,
    type: "Veg",
    category: "Main Course",
  },
  {
    id: 7,
    image: "/food-items/pasta.jpg",
    title: "Creamy Alfredo Pasta",
    price: 15.99,
    type: "Veg",
    category: "Pasta",
  },
  {
    id: 8,
    image: "/food-items/fish.webp",
    title: "Grilled Fish with Lemon Butter Sauce",
    price: 8.99,
    type: "Non Veg",
    category: "Main Course",
  },
];


export default function POSPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [diningMode, setDiningMode] = useState<DiningMode>("dine-in")
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>(foodItemsData)

  // Filter items based on search query and active category
  useEffect(() => {
    let filtered = foodItemsData

    // If there's a search query, prioritize search results over category filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = foodItemsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      )
    }
    // If no search query, apply category filter
    else if (activeCategory !== "All") {
      filtered = foodItemsData.filter((item) => item.category === activeCategory)
    }

    setFilteredItems(filtered)
  }, [searchQuery, activeCategory])

  const toggleSidebar = (): void => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Add item to cart
  const addToCart = (item: FoodItem): void => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // Item already in cart, increase quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        // Item not in cart, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (itemId: number): void => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId)

      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prevItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        // Remove item if quantity is 1
        return prevItems.filter((item) => item.id !== itemId)
      }
    })
  }

  // Get item quantity in cart
  const getItemQuantity = (itemId: number): number => {
    const item = cartItems.find((item) => item.id === itemId)
    return item ? item.quantity : 0
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} hideToggle={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebarAction={toggleSidebar}
          openOrderSheetAction={() => setIsOpen(true)}
          searchQuery={searchQuery}
          setSearchQueryAction={setSearchQuery}
        />
        <div className="relative flex-1 overflow-hidden p-4 sm:p-6">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <CategoryFilter
                activeCategory={activeCategory}
                setActiveCategoryAction={setActiveCategory}
                isSearching={searchQuery.trim().length > 0}
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-lg bg-gray-50 p-4">
              <FoodGrid
                foodItems={filteredItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getItemQuantity={getItemQuantity}
              />
            </div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-[400px] sm:w-[540px] p-0 [&>button]:hidden">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="mr-2 h-8 w-8">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                  <SheetTitle className="text-xl font-bold m-0 flex-1">Order Details</SheetTitle>
                  <Select value={diningMode} onValueChange={(value: DiningMode) => setDiningMode(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dine-in">Dine in</SelectItem>
                      <SelectItem value="take-away">Take Away</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="h-[calc(100vh-57px)]">
                <Cart cartItems={cartItems} addToCartAction={addToCart} removeFromCartAction={removeFromCart} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

