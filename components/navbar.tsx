"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="hover:text-blue-600">
          kenny shop
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className=" flex items-center space-x-4">
          <Link
            href={`/checkout`}
            aria-label="View cart"
            className="relative group"
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant={`ghost`}
            className="md:hidden ml-auto flex  bg-white shadow-md transition-all duration-300 ease-in-out"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            title="Toggle mobile menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div className="fixed">
          {mobileOpen && (
            <nav className="fixed top-16 right-4 w-48 p-4 md:hidden bg-white shadow-md rounded-md z-50">
              <ul className="flex flex-col p-4 space-y-2">
                <li>
                  <Link href={`/`} className="block hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/products`}
                    className="block hover:text-blue-600"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/checkout`}
                    className="block hover:text-blue-600"
                  >
                    Checkout
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </nav>
  );
};
