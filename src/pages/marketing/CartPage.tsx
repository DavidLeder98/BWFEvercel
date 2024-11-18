import { useEffect } from "react";
import CartListGuest from "../../components/cartlist/CartListGuest";
import CartListUser from "../../components/cartlist/CartListUser";
import { useCartUser } from "../../services/cart/CartContextUser";
import { useAuth } from "../../services/account/AuthContext";
import PageEnd from "../../components/pageend/PageEnd";

const CartPage = () => {
    const { fetchBooksInCart } = useCartUser();
    const { username } = useAuth(); // Gets the logged-in user's username

    useEffect(() => {
        fetchBooksInCart(); // Fetches cart data on every render
    }, [fetchBooksInCart]);

    return (
        <>
            {username ? (
                <CartListUser /> // Renders if user is logged in
            ) : (
                <CartListGuest /> // Renders if user is not logged in
            )}
            <PageEnd />
        </>
    );
};

export default CartPage;