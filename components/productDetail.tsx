"use client";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  console.log("ProductDetail", product);

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
  };
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
        <Image
          alt={product.name}
          src={product.images[0]}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "contain" }}
          className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900 pb-4">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4">
          <Button variant={"outline"} onClick={() => removeItem(product.id)}>
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem} className="bg-black text-white">
            +
          </Button>
        </div>
        <Button
          onClick={() => {
            window.location.href = "/products";
          }}
          className="mt-4 bg-blue-500 text-white"
        >
          ⇐ Back to products
        </Button>
        <br />
        <Button
          onClick={() => {
            window.location.href = "/checkout";
          }}
          className="mt-4 bg-black text-white pl-10 pr-10"
        >
          Checkout ⇒
        </Button>
      </div>
    </div>
  );
};
