"use client";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkoutAction } from "./checkoutAction";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <h1 className="text-xl font-semibold text-gray-500">
          Your Cart is empty!
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your items!</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li
                key={key}
                className="flex justify-between items-center gap-4 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    −
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    size="icon"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center text-lg font-bold">
            Total: ${(total / 100).toFixed(2)}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md mx-auto px-4">
            <Link href="/products">
              <Button variant="default" className="">
                ← Back to Products
              </Button>
            </Link>
            <Button
              onClick={() => clearCart()}
              className="bg-blue-600 text-white px-12  hover:bg-blue-700"
            >
              Clear cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="flex justify-center mt-4">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          variant={`default`}
          className="bg-blue-600 text-white mt-2 hover:bg-blue-700 w-full"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
