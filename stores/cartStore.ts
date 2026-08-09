import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productSlug: string;
  variantSku?: string;
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productSlug: string, variantSku?: string) => void;
  updateQuantity: (productSlug: string, variantSku: string | undefined, quantity: number) => void;
  clear: () => void;
}

function lineKey(productSlug: string, variantSku?: string) {
  return `${productSlug}::${variantSku ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = lineKey(item.productSlug, item.variantSku);
          const quantityToAdd = item.quantity ?? 1;
          const existing = state.items.find(
            (line) => lineKey(line.productSlug, line.variantSku) === key,
          );

          if (existing) {
            return {
              items: state.items.map((line) =>
                lineKey(line.productSlug, line.variantSku) === key
                  ? { ...line, quantity: line.quantity + quantityToAdd }
                  : line,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: quantityToAdd }] };
        }),

      removeItem: (productSlug, variantSku) =>
        set((state) => ({
          items: state.items.filter(
            (line) =>
              lineKey(line.productSlug, line.variantSku) !== lineKey(productSlug, variantSku),
          ),
        })),

      updateQuantity: (productSlug, variantSku, quantity) =>
        set((state) => ({
          items: state.items
            .map((line) =>
              lineKey(line.productSlug, line.variantSku) === lineKey(productSlug, variantSku)
                ? { ...line, quantity }
                : line,
            )
            .filter((line) => line.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "aethelred-cart" },
  ),
);

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
}
