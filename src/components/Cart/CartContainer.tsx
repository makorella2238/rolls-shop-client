import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import Cart from "./Cart.tsx";
import {isAuth} from "../Redux/app/app-selector.ts";
import AuthModal from "../AuthModal/AuthModal.tsx";
import {useState} from "react";
import {useDeleteAllCartItems, useDeleteCartItem, useGetCartItems} from "../hooks/cart.ts";
import {useGetProfile} from "../hooks/profile.ts";
import {useCreateOrderItems} from "../hooks/order.ts";

interface CartAPIContainerProps {
    isAuth: boolean
}


const CartAPIContainer = ({isAuth}: CartAPIContainerProps) => {
    if (isAuth) {
        const [deleteAllError, setDeleteAllError] = useState("");
        const [сreateOrderLoading, setCreateOrderLoading] = useState(false);
        const [deleteCartLoading, setDeleteCartLoading] = useState(false);
        const [successCreateOrder, setSuccessCreateOrder] = useState(false);
        const {data: profileData, isFetching: profileFetching, error: profileError} = useGetProfile()
        // @ts-ignore
        const {data: cartData, isLoading: cartFetching, error: cartError} = useGetCartItems()
        // @ts-ignore
        const {handleDelete} = useDeleteCartItem(setDeleteCartLoading);
        const {handleDeleteAll} = useDeleteAllCartItems(setDeleteAllError);
        const {handleCreateOrderItems} = useCreateOrderItems(setCreateOrderLoading, setSuccessCreateOrder)

        if (cartFetching || profileFetching) {
            return <Preloader/>;
        }
        if (profileError || cartError) {
            return (
                <>
                    { profileError && <p>{ profileError }</p> }
                    { cartError && <p>{ cartError }</p> }
                </>
            )
        }

        // @ts-ignore
        return <Cart cartItem={ cartData } handleDelete={ handleDelete } handleDeleteAll={ handleDeleteAll }
                     deleteAllError={ deleteAllError } profile={profileData} handleCreateOrderItems={handleCreateOrderItems}
                     сreateOrderLoading={сreateOrderLoading} setCreateOrderLoading={setCreateOrderLoading}
                     successCreateOrder={successCreateOrder} setSuccessCreateOrder={setSuccessCreateOrder}
                     deleteCartLoading={deleteCartLoading} setDeleteCartLoading={setDeleteCartLoading}
        />
    } else {
        return <AuthModal/>
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state),
    }
};

// @ts-ignore
export default connect(mapStateToProps, {})(CartAPIContainer)