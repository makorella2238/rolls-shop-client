import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import {useParams} from "react-router-dom";
import {isAuth} from "../Redux/app/app-selector.ts";
import BaseComponent from "./BaseComponent.tsx";
import {useGetMenuItems} from "../hooks/menuItems.ts";
import {useGetFavoriteItems, useToggleFavoriteItem} from "../hooks/favorite.ts";
import {useCreateCartItem} from '../hooks/cart.ts'
import {IMenuItem} from "../../../types.ts";
import {useState} from "react";

interface BaseComponentAPIContainerProps {
    isAuth: boolean;
}

// @ts-ignore
let favoriteItemsData: [IMenuItem] = []
let favoriteItemsFetching = false;
let favoriteItemsError: unknown = null;

const BaseComponentAPIContainer = ({isAuth}: BaseComponentAPIContainerProps) => {
    const params = useParams();
    const [toggleFavoriteLoading, setToggleFavoriteLoading] = useState(false)
    const [createCartLoading, setCreateCartLoading] = useState(false)

    const {handleCreateCartItem} = useCreateCartItem(setCreateCartLoading)
    const {handleToggleFavorite} = useToggleFavoriteItem(setToggleFavoriteLoading)

    const {isFetching: menuItemsFetching, error: menuItemsError, data: menuItemsData} = useGetMenuItems(params.title);
    if (isAuth) {
        const favoriteItemsHook = useGetFavoriteItems();
        favoriteItemsData = favoriteItemsHook.data;
        favoriteItemsFetching = favoriteItemsHook.isFetching;
        favoriteItemsError = favoriteItemsHook.error;
    }

    if (!favoriteItemsData || !menuItemsData) {
        return <Preloader/>
    }

    if (menuItemsError || favoriteItemsError) {
        // @ts-ignore
        return <p>{menuItemsError || favoriteItemsError}</p>
    }

    // @ts-ignore
    return (
        // @ts-ignore
        <BaseComponent isAuth={ isAuth } handleCreateCartItem={ handleCreateCartItem } handleToggleFavorite={ handleToggleFavorite } title={ params.title }
                       menuItems={ menuItemsData } favoriteItems={ favoriteItemsData } favoriteItemsFetching={favoriteItemsFetching} menuItemsFetching={menuItemsFetching}
                       toggleFavoriteLoading={toggleFavoriteLoading} createCartLoading={createCartLoading} setToggleFavoriteLoading={setToggleFavoriteLoading}
                       setCreateCartLoading={setCreateCartLoading}
        />
    );
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state),
    };
};

export default connect(mapStateToProps, {})(BaseComponentAPIContainer);