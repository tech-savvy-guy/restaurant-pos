"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export interface FoodCardProps {
  id: number
  image: string
  title: string
  price: number
  discount?: number
  type: "Veg" | "Non Veg"
  quantity: number
  onAddAction: () => void
  onRemoveAction: () => void
}

export function FoodCard({ image, title, price, discount, type, quantity, onAddAction, onRemoveAction }: FoodCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <div className="relative pt-[75%]">
          <img src={image || "/placeholder.svg"} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        {discount && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-medium">
            {discount}% Off
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${type === "Veg" ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <h3 className="text-xs sm:text-sm font-medium line-clamp-2">{title}</h3>
        </div>
        <div className="mt-2 pt-2 border-t flex justify-between items-center">
          <span className="text-primary font-bold text-sm sm:text-base">${price.toFixed(2)}</span>
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-1 py-0.5 border">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-gray-100"
              onClick={onRemoveAction}
              disabled={quantity === 0}
            >
              <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
            </Button>
            <span className="font-medium text-xs sm:text-sm min-w-[16px] text-center">{quantity || 0}</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-gray-100"
              onClick={onAddAction}
            >
              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

