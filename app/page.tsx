export const dynamic = "force-dynamic";

import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/carousel";
export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to kennys shop
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices
            </p>
            <Button
              asChild
              variant={`default`}
              className="bg-blue-600 text-white"
            >
              <Link href={`/products`}>Browse our products</Link>
            </Button>
          </div>
          <Image
            alt="banner"
            width={450}
            height={450}
            src={products.data[0].images[0]}
          />
        </div>
      </section>
      <section>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
