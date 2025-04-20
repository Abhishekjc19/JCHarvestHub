import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../utils/types';

// Define the cart state and actions
type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    }
    case 'REMOVE_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload);
      
      if (!existingItem) return state;

      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - existingItem.quantity,
        totalPrice: state.totalPrice - (existingItem.price * existingItem.quantity),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      
      if (existingItemIndex === -1) return state;
      
      const item = state.items[existingItemIndex];
      const quantityDiff = quantity - item.quantity;
      
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...item,
        quantity,
      };
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.price * quantityDiff),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Create context
type CartContextType = {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};