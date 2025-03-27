"use client"

import { Button } from "@/components/ui/button"
import { CreditCard, QrCode, Banknote, Minus, Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FoodItem } from "./food-grid"

export interface CartItem extends FoodItem {
  quantity: number
}

export interface CartProps {
  cartItems: CartItem[]
  addToCartAction: (item: CartItem) => void
  removeFromCartAction: (itemId: number) => void
}

export function Cart({ cartItems = [], addToCartAction, removeFromCartAction }: CartProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  return (
    <div className="w-full bg-white flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 mb-4 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                {item.type === "Veg" ? (
                  <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                ) : (
                  <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1 line-clamp-1">{item.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-primary font-bold">${item.price.toFixed(2)}</span>

                  <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-1 py-0.5 border shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-gray-100"
                      onClick={() => removeFromCartAction(item.id)}
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
                      ) : (
                        <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
                      )}
                    </Button>
                    <span className="font-medium text-xs sm:text-sm min-w-[16px] text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-gray-100"
                      onClick={() => addToCartAction(item)}
                    >
                      <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p>Your cart is empty</p>
            <p className="text-sm">Add items to get started</p>
          </div>
        )}
      </ScrollArea>
      <div className="border-t p-4 mb-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax 5%</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button variant="outline" className="flex flex-row items-center justify-center gap-2 py-2">
            <Banknote className="h-4 w-4" />
            <span className="text-xs">Cash</span>
          </Button>
          <Button variant="outline" className="flex flex-row items-center justify-center gap-2 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs">Card</span>
          </Button>
          <Button variant="outline" className="flex flex-row items-center justify-center gap-2 py-2">
            <QrCode className="h-4 w-4" />
            <span className="text-xs">QR Code</span>
          </Button>
        </div>
        <Button className="w-full" disabled={cartItems.length === 0}>
          Place Order
        </Button>
      </div>
    </div>
  )
}

