"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { membershipTiers } from "@/lib/data/membership";

export interface CartItem {
  key: string; // productId + variant ids
  productId: string;
  slug: string;
  name: string;
  imageSeed: string;
  unitPrice: number;
  variantLabel?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  /** Active membership tier id, or null. Demos member pricing. */
  membershipTierId: string | null;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  setMembership: (tierId: string | null) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      membershipTierId: null,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.key === item.key);
          const items = existing
            ? state.items.map((i) =>
                i.key === item.key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              )
            : [...state.items, { ...item, quantity }];
          return { items, isOpen: true };
        }),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQty: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setMembership: (tierId) => set({ membershipTierId: tierId }),
    }),
    { name: "salt-stream-cart" },
  ),
);

/** Discount fraction for the active tier (0 when no membership). */
export function memberDiscountFor(tierId: string | null): number {
  if (!tierId) return 0;
  return membershipTiers.find((t) => t.id === tierId)?.memberDiscount ?? 0;
}
