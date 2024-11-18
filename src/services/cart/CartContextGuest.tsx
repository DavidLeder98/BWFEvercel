import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItemGuest {
    id: number;
    title: string;
    rating: number;
    bestSeller: boolean;
    listPrice: number;
    price: number;
    imageUrl: string;
    authorName: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItemGuest[];
    addToCart: (item: CartItemGuest) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

const CartContextGuest = createContext<CartContextType | undefined>(undefined);

export const useCartGuest = () => {
    const context = useContext(CartContextGuest);
    if (!context) {
        throw new Error("useCartGuest must be used within a CartProviderGuest");
    }
    return context;
};

const CART_STORAGE_KEY = 'guest_cart';

export const CartProviderGuest = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemGuest[]>(() => {
        // Loads cart items from local storage on initial render
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Updates local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItemGuest) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevItems, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContextGuest.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateItemQuantity }}>
            {children}
        </CartContextGuest.Provider>
    );
};

export default CartContextGuest;