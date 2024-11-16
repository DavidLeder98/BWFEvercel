import { useEffect } from "react";
import CartListGuest from "../../components/cartlist/CartListGuest";
import CartListUser from "../../components/cartlist/CartListUser";
import { useCartUser } from "../../services/cart/CartContextUser";
import { useAuth } from "../../services/account/AuthContext"; // Import the auth context
import PageEnd from "../../components/pageend/PageEnd";

const CartPage = () => {
    const { fetchBooksInCart } = useCartUser();
    const { username } = useAuth(); // Get the logged-in user's username

    useEffect(() => {
        fetchBooksInCart(); // Fetch cart data on every render
    }, [fetchBooksInCart]);

    return (
        <>
            {username ? (
                <CartListUser /> // Render this if user is logged in
            ) : (
                <CartListGuest /> // Render this if user is not logged in
            )}
            <PageEnd />
        </>
    );
};

export default CartPage;