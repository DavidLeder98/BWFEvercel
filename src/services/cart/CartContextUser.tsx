import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../account/AuthContext';
import { BookCardDto } from '../book/BookCardDto';

interface CartContextUserType {
    booksInCart: BookCardDto[];
    fetchBooksInCart: () => Promise<BookCardDto[]>;
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

    // Fetches the book IDs in the user's cart
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

                // Filters out any null responses (if any IDs were not found)
                const validBooks = bookCards.filter((book): book is BookCardDto => book !== null);
                setBooksInCart(validBooks);

                // Initializes quantities in localStorage if they don't already exist
                bookIds.forEach((id) => {
                    const quantity = localStorage.getItem(`quantity_${id}`);
                    if (!quantity) localStorage.setItem(`quantity_${id}`, '1'); // Defaults to quantity 1
                });

                return validBooks; // Returns the valid book cards
            } else {
                console.error('Failed to fetch book IDs in cart.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching books in cart:', error);
            return [];
        }
    };

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
                const updatedBooks = await fetchBooksInCart();
                setBooksInCart(updatedBooks);
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

export const useCartUser = () => {
    const context = useContext(CartContextUser);
    if (context === undefined) {
        throw new Error('useCartUser must be used within a CartProviderUser');
    }
    return context;
};
