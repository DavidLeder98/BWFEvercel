import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../account/AuthContext';
import { BookCardDto } from '../book/BookCardDto';

interface CartContextUserType {
    booksInCart: BookCardDto[];
    fetchBooksInCart: () => Promise<BookCardDto[]>; // Change return type
    updateBooksInCart: (bookIds: number[]) => Promise<void>;
}

const CartContextUser = createContext<CartContextUserType | undefined>(undefined);

const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/account';

export const CartProviderUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { username } = useAuth();
    const [booksInCart, setBooksInCart] = useState<BookCardDto[]>([]);

    useEffect(() => {
        if (username) {
            fetchBooksInCart();
        }
    }, [username]);

    // Fetch the book IDs in the user's cart
    const fetchBooksInCart = async () => {
        if (!username) return [];

        try {
            const response = await fetch(`${API_URL}/${username}/bookIds`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const bookIds: number[] = await response.json();
                const bookCards: BookCardDto[] = await Promise.all(
                    bookIds.map(async (id) => {
                        const bookResponse = await fetch(`https://bookwyrmapi2.azurewebsites.net/api/book/card/${id}`, {
                            method: 'GET',
                            credentials: 'include',
                        });
                        return bookResponse.ok ? await bookResponse.json() : null;
                    })
                );

                // Filter out any null responses (if any IDs were not found)
                const validBooks = bookCards.filter((book): book is BookCardDto => book !== null);
                setBooksInCart(validBooks);

                // Initialize quantities in localStorage if they don't already exist
                bookIds.forEach((id) => {
                    const quantity = localStorage.getItem(`quantity_${id}`);
                    if (!quantity) localStorage.setItem(`quantity_${id}`, '1'); // Default to quantity 1
                });

                return validBooks; // Return the valid book cards
            } else {
                console.error('Failed to fetch book IDs in cart.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching books in cart:', error);
            return [];
        }
    };

    // Update the books in the user's cart
    const updateBooksInCart = async (bookIds: number[]) => {
        if (!username) return;

        try {
            const response = await fetch(`${API_URL}/${username}/bookIds`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookIds),
                credentials: 'include',
            });

            if (response.ok) {
                // Fetch updated books in cart and set state
                const updatedBooks = await fetchBooksInCart();
                setBooksInCart(updatedBooks); // Update state after fetching
            } else {
                const errorData = await response.json();
                console.error('Failed to update books in cart:', errorData);
            }
        } catch (error) {
            console.error('Error updating books in cart:', error);
        }
    };

    return (
        <CartContextUser.Provider value={{ booksInCart, fetchBooksInCart, updateBooksInCart }}>
            {children}
        </CartContextUser.Provider>
    );
};

// Custom hook to use the Cart context
export const useCartUser = () => {
    const context = useContext(CartContextUser);
    if (context === undefined) {
        throw new Error('useCartUser must be used within a CartProviderUser');
    }
    return context;
};
