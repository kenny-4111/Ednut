"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container border shadow-md mx-auto px-4 py-8 text-center items-center ">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Button
        onClick={() => {
          window.location.href = "/products";
        }}
        className="bg-blue-500 text-white"
      >
        Back to Products
      </Button>
    </div>
  );
}
