import Link from "next/link";
import type { Metadata } from "next";
import { dbConnect } from "@/lib/db/connect";
import { Article } from "@/lib/models/Article";
import { Collection } from "@/lib/models/Collection";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";

export const metadata: Metadata = {
  title: "Admin Dashboard — Aethelred",
};

export default async function AdminDashboardPage() {
  await dbConnect();
  const [productCount, collectionCount, pendingOrderCount, articleCount] = await Promise.all([
    Product.countDocuments(),
    Collection.countDocuments(),
    Order.countDocuments({ status: "pending" }),
    Article.countDocuments(),
  ]);

  const cards = [
    { label: "Products", count: productCount, href: "/admin/products" },
    { label: "Collections", count: collectionCount, href: "/admin/collections" },
    { label: "Orders awaiting payment", count: pendingOrderCount, href: "/admin/orders" },
    { label: "Journal articles", count: articleCount, href: "/admin/journal" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="border-border flex flex-col gap-2 border p-6 transition-opacity duration-150 hover:opacity-70"
        >
          <p className="text-heading-2 text-text-secondary">{card.count}</p>
          <p className="text-body text-text-primary">{card.label}</p>
        </Link>
      ))}
    </div>
  );
}
