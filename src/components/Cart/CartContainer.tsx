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

    const [deleteAllError, setDeleteAllError] = useState("");
    const [сreateOrderLoading, setCreateOrderLoading] = useState(false);
    const [deleteCartLoading, setDeleteCartLoading] = useState(false);
    const [successCreateOrder, setSuccessCreateOrder] = useState(false);

    if (!isAuth) {
        return <AuthModal/>
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: profileData, isFetching: profileFetching, error: profileError} = useGetProfile()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: cartData, isLoading: cartFetching, error: cartError} = useGetCartItems()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {handleDelete} = useDeleteCartItem(setDeleteCartLoading);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {handleDeleteAll} = useDeleteAllCartItems(setDeleteAllError);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {handleCreateOrderItems} = useCreateOrderItems(setCreateOrderLoading, setSuccessCreateOrder)

    if (cartFetching || profileFetching) {
        return <Preloader/>;
    }
    if (profileError || cartError) {
        // @ts-ignore
        return <p>{ profileError || cartError }</p>
    }

    return <Cart cartItem={ cartData } handleDelete={ handleDelete } handleDeleteAll={ handleDeleteAll }
                 deleteAllError={ deleteAllError } profile={ profileData }
                 handleCreateOrderItems={ handleCreateOrderItems }
                 сreateOrderLoading={ сreateOrderLoading } setCreateOrderLoading={ setCreateOrderLoading }
                 successCreateOrder={ successCreateOrder } setSuccessCreateOrder={ setSuccessCreateOrder }
                 deleteCartLoading={ deleteCartLoading } setDeleteCartLoading={ setDeleteCartLoading }
    />
}

const mapStateToProps = (state: never) => {
    return {
        isAuth: isAuth(state),
    }
};

// @ts-ignore
export default connect(mapStateToProps, {})(CartAPIContainer)