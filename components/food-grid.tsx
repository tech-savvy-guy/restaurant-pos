import { FoodCard } from "./food-card"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface FoodItem {
  id: number
  image: string
  title: string
  price: number
  discount?: number
  type: "Veg" | "Non Veg"
  category: string
}

export interface FoodGridProps {
  foodItems: FoodItem[]
  addToCart: (item: FoodItem) => void
  removeFromCart: (itemId: number) => void
  getItemQuantity: (itemId: number) => number
}

export function FoodGrid({ foodItems = [], addToCart, removeFromCart, getItemQuantity }: FoodGridProps) {
  return (
    <ScrollArea className="h-full pb-6">
      {foodItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 pr-4">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm">
              <FoodCard
                {...item}
                quantity={getItemQuantity(item.id)}
                onAddAction={() => addToCart(item)}
                onRemoveAction={() => removeFromCart(item.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-lg font-medium mb-2">No items found</p>
          <p className="text-sm">Try a different search term or category</p>
        </div>
      )}
    </ScrollArea>
  )
}

