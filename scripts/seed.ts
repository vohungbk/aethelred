import { config } from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "../lib/db/connect";
import { Collection } from "../lib/models/Collection";
import { Product } from "../lib/models/Product";
import { Variant } from "../lib/models/Variant";

config({ path: ".env.local" });

interface VariantSeed {
  skuSuffix: string;
  attributes: { fabric?: string; finish?: string; size?: string; legColor?: string };
  priceDelta: number;
  leadTimeDays?: number;
}

interface ProductSeed {
  slug: string;
  name: string;
  descriptor: string;
  description: string;
  collectionSlug: string;
  category: string;
  basePrice: number;
  featured?: boolean;
  featuredOrder?: number;
  isCustomizable?: boolean;
  variants?: VariantSeed[];
}

const collections = [
  {
    slug: "sofas",
    name: "Sofas & Sectionals",
    description: "Tailored silhouettes built for daily ease and lasting comfort.",
    sortOrder: 1,
  },
  {
    slug: "armchairs",
    name: "Armchairs",
    description: "Single-seat pieces that anchor a room with quiet presence.",
    sortOrder: 2,
  },
  {
    slug: "tables",
    name: "Tables",
    description: "Dining, side, and coffee tables shaped from solid hardwood and stone.",
    sortOrder: 3,
  },
  {
    slug: "lighting",
    name: "Lighting",
    description: "Sculptural fixtures that pair brass and hand-blown glass.",
    sortOrder: 4,
  },
  {
    slug: "case-goods",
    name: "Case Goods",
    description: "Credenzas, cabinets, and storage pieces finished by hand.",
    sortOrder: 5,
  },
];

const products: ProductSeed[] = [
  {
    slug: "elara-chaise",
    name: "The Elara Chaise",
    descriptor: "Sculptural Comfort",
    description:
      "A sculptural chaise upholstered in deep velvet, finished with a solid brass base.",
    collectionSlug: "sofas",
    category: "sofa",
    basePrice: 1250000,
    featured: true,
    featuredOrder: 1,
    isCustomizable: true,
    variants: [
      { skuSuffix: "velvet-navy", attributes: { fabric: "Velvet — Navy" }, priceDelta: 0 },
      { skuSuffix: "velvet-forest", attributes: { fabric: "Velvet — Forest" }, priceDelta: 0 },
      {
        skuSuffix: "boucle-cream",
        attributes: { fabric: "Bouclé — Cream" },
        priceDelta: 45000,
        leadTimeDays: 49,
      },
    ],
  },
  {
    slug: "orion-credenza",
    name: "The Orion Credenza",
    descriptor: "Hand-Carved Texture",
    description: "A hand-carved oak credenza with a fluted door front and brass hardware.",
    collectionSlug: "case-goods",
    category: "case-goods",
    basePrice: 1890000,
    featured: true,
    featuredOrder: 2,
  },
  {
    slug: "lyra-pendant",
    name: "The Lyra Pendant",
    descriptor: "Illuminated Artistry",
    description: "A hand-blown glass pendant suspended from a slender brass stem.",
    collectionSlug: "lighting",
    category: "lighting",
    basePrice: 950000,
    featured: true,
    featuredOrder: 3,
  },
  {
    slug: "wyndham-sofa",
    name: "The Wyndham Sofa",
    descriptor: "Tailored Ease",
    description: "A three-seat sofa with a tight back and deep, feather-wrapped cushions.",
    collectionSlug: "sofas",
    category: "sofa",
    basePrice: 1450000,
  },
  {
    slug: "alden-armchair",
    name: "The Alden Armchair",
    descriptor: "Quiet Presence",
    description: "A swivel armchair in brushed leather with a solid walnut frame.",
    collectionSlug: "armchairs",
    category: "armchair",
    basePrice: 680000,
    isCustomizable: true,
    variants: [
      { skuSuffix: "leather-cognac", attributes: { fabric: "Leather — Cognac" }, priceDelta: 0 },
      {
        skuSuffix: "leather-charcoal",
        attributes: { fabric: "Leather — Charcoal" },
        priceDelta: 0,
      },
    ],
  },
  {
    slug: "merrow-armchair",
    name: "The Merrow Armchair",
    descriptor: "Sculpted Comfort",
    description: "A curved-back armchair upholstered in boucle with tapered brass legs.",
    collectionSlug: "armchairs",
    category: "armchair",
    basePrice: 720000,
  },
  {
    slug: "halden-dining-table",
    name: "The Halden Dining Table",
    descriptor: "Solid Hardwood",
    description: "A dining table in solid white oak with a live-edge detail.",
    collectionSlug: "tables",
    category: "table",
    basePrice: 990000,
    isCustomizable: true,
    variants: [
      { skuSuffix: "84in", attributes: { size: '84" L' }, priceDelta: 0 },
      { skuSuffix: "108in", attributes: { size: '108" L' }, priceDelta: 220000, leadTimeDays: 56 },
    ],
  },
  {
    slug: "cove-side-table",
    name: "The Cove Side Table",
    descriptor: "Sculpted Stone",
    description: "A side table carved from a single block of honed marble.",
    collectionSlug: "tables",
    category: "table",
    basePrice: 340000,
  },
  {
    slug: "solene-pendant",
    name: "The Solene Pendant",
    descriptor: "Warm Glow",
    description: "A ribbed glass pendant with a warm, dimmable brass fitting.",
    collectionSlug: "lighting",
    category: "lighting",
    basePrice: 410000,
  },
  {
    slug: "marlowe-cabinet",
    name: "The Marlowe Cabinet",
    descriptor: "Hand-Finished Storage",
    description: "A tall cabinet in smoked oak with brass pulls and adjustable shelving.",
    collectionSlug: "case-goods",
    category: "case-goods",
    basePrice: 1620000,
  },
];

async function seed() {
  await dbConnect();

  await Promise.all([Collection.deleteMany({}), Product.deleteMany({}), Variant.deleteMany({})]);

  const collectionDocs = await Collection.insertMany(collections);
  const collectionIdBySlug = new Map(collectionDocs.map((doc) => [doc.slug, doc._id]));

  const productDocs = await Product.insertMany(
    products.map((product) => ({
      slug: product.slug,
      name: product.name,
      descriptor: product.descriptor,
      description: product.description,
      category: product.category,
      basePrice: product.basePrice,
      featured: product.featured,
      featuredOrder: product.featuredOrder,
      isCustomizable: product.isCustomizable,
      collectionId: collectionIdBySlug.get(product.collectionSlug),
      status: "published",
    })),
  );
  const productIdBySlug = new Map(productDocs.map((doc) => [doc.slug, doc._id]));

  const variantDocs = products.flatMap((product) =>
    (product.variants ?? []).map((variant) => ({
      productId: productIdBySlug.get(product.slug),
      sku: `${product.slug}-${variant.skuSuffix}`,
      attributes: variant.attributes,
      priceDelta: variant.priceDelta,
      fulfillmentType: "made-to-order" as const,
      inStock: true,
      leadTimeDays: variant.leadTimeDays ?? 35,
    })),
  );

  if (variantDocs.length > 0) {
    await Variant.insertMany(variantDocs);
  }

  console.log(
    `Seeded ${collectionDocs.length} collections, ${productDocs.length} products, and ${variantDocs.length} variants.`,
  );

  await mongoose.disconnect();
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
