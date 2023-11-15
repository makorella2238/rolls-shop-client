import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import {useParams} from "react-router-dom";
import {isAuth} from "../Redux/app/app-selector.ts";
import { useGetMenuItem} from "../hooks/menuItems.ts";
import {useCreateCartItem, useGetCartItems} from "../hooks/cart.ts";
import {MenuOneElement} from './MenuOneElement.tsx'
import {ICartItem} from "../../../types.ts";
import {useState} from "react";

interface MenuOneElementContainerProps {
    isAuth: boolean;
}
const MenuOneElementContainer = ({isAuth}: MenuOneElementContainerProps) => {
    let cartData: ICartItem[] = []
    let cartFetching = false;
    let cartError = null;

    const params = useParams();
    // @ts-ignore
    const {data, isFetching, error } = useGetMenuItem(params.title, params.id)
    const [createCartOneElLoading, setCreateCartOneElLoading] = useState(false)
    const {handleCreateCartItem} = useCreateCartItem(setCreateCartOneElLoading)

    if (isAuth) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const cartItemsHook = useGetCartItems();
        cartData = cartItemsHook.data
        cartFetching = cartItemsHook.isFetching;
        cartError = cartItemsHook.error;

        if (cartFetching) {
            return <Preloader/>
        }
        if (cartError) {
            // @ts-ignore
            return <p>{ cartError }</p>
        }
    }

    if (isFetching) {
        return <Preloader/>;
    }

    if (error) {
        // @ts-ignore
        return <p>{ error }</p>;
    }
    return (
        // @ts-ignore
        <MenuOneElement isAuth={ isAuth } handleCreateCartItem={ handleCreateCartItem }  menuItem={ data } category={params.title}
                        cartItems={cartData} createCartLoading={createCartOneElLoading} setCreateCartLoading={setCreateCartOneElLoading}/>
    );
};

const mapStateToProps = (state: never) => {
    return {
        isAuth: isAuth(state),
    };
};

export default connect(mapStateToProps, {})(MenuOneElementContainer);