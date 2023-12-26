import Favorites from "./Favorites.tsx";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import {isAuth} from "../Redux/app/app-selector.ts";
import AuthModal from "../Modal/Modal.tsx";
import {useCreateCartItem} from "../hooks/cart.ts";
import {useDeleteFavoriteItems, useGetFavoriteItems, useToggleFavoriteItem} from "../hooks/favorite.ts";
import {useState} from "react";

interface FavoritesAPIContainerProps {
    isAuth: boolean
}

function FavoritesAPIContainer({isAuth}: FavoritesAPIContainerProps) {
    if (!isAuth) {
        return <AuthModal/>
    }

    const {data, isLoading, error} = useGetFavoriteItems()
    const {handleDeleteFavorites} = useDeleteFavoriteItems()
    const [favoriteCartLoading, setFavoriteCartLoading] = useState(false);
    const [favoriteFavoriteItemsLoading, setFavoriteFavoriteItemsLoading] = useState(false);
    const {handleCreateCartItem} = useCreateCartItem(setFavoriteCartLoading)
    const {handleToggleFavorite} = useToggleFavoriteItem(setFavoriteFavoriteItemsLoading)

    if (isLoading) {
        return <Preloader/>
    }
    if (error) {
        // @ts-ignore
        return <p>{ error }</p>
    }

    // @ts-ignore
    return <Favorites favorites={ data} handleCreateCartItem={ handleCreateCartItem } handleToggleFavorite={ handleToggleFavorite }
                      handleDeleteFavorites={handleDeleteFavorites} favoriteCartLoading={favoriteCartLoading} setFavoriteCartLoading={setFavoriteCartLoading}
                      favoriteFavoriteItemsLoading={favoriteFavoriteItemsLoading} setFavoriteFavoriteItemsLoading={setFavoriteFavoriteItemsLoading}/>
}

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state)
    }
};
// @ts-ignore
export default connect(mapStateToProps, {})(FavoritesAPIContainer)