"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Mock cart item type for demo purposes
export interface MockCartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface MockCartContextType {
  items: MockCartItem[];
  cartCount: number;
  total: number;
  addToCart: (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const MockCartContext = createContext<MockCartContextType | undefined>(
  undefined
);

export const useMockCart = () => {
  const context = useContext(MockCartContext);
  if (!context) {
    throw new Error("useMockCart must be used within a MockCartProvider");
  }
  return context;
};

export function MockCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MockCartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("mockCart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("mockCart", JSON.stringify(items));
  }, [items]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value: MockCartContextType = {
    items,
    cartCount,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <MockCartContext.Provider value={value}>
      {children}
    </MockCartContext.Provider>
  );
}
