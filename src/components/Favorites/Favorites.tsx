import {ICartItem, IMenuItem} from "../../../types.ts";
import BaseComponentItem from "../BaseComponent/BaseComponentItem/BaseComponentItem.tsx";
// @ts-ignore
import s from './Favorites.module.css'
import {Link} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader.tsx";

interface FavoritesProps {
    favorites: IMenuItem[]
    handleToggleFavorite: (item: IMenuItem) => void;
    handleCreateCartItem: (item: ICartItem) => void;
    handleDeleteFavorites: () => void
    favoriteCartLoading: boolean
    favoriteFavoriteItemsLoading: boolean
    setFavoriteCartLoading: React.Dispatch<React.SetStateAction<boolean>>
    setFavoriteFavoriteItemsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Favorites({
                       favorites,
                       handleCreateCartItem,
                       handleToggleFavorite,
                       handleDeleteFavorites,
                       favoriteFavoriteItemsLoading,
                       favoriteCartLoading,
                       setFavoriteFavoriteItemsLoading,
                       setFavoriteCartLoading
                   }: FavoritesProps) {

    if (favorites.length === 0) {
        return (
            <div className={ s.empty }>
                <p>У вас нет избранных товаров</p>
                <Link to="/" className={ s.link }>Перейти в меню</Link>
            </div>
        )
    }

    const favoritesEl = favorites.map((item: IMenuItem) =>
        <BaseComponentItem
            handleCreateCartItem={ handleCreateCartItem }
            handleToggleFavorite={ handleToggleFavorite }
            key={ item._id }
            menuItem={ item }
            isAuth={ true }
            isFavorite={ true }
            setFavoriteFavoriteItemsLoading={setFavoriteFavoriteItemsLoading}
            setFavoriteCartLoading={setFavoriteCartLoading}
        />)

    return (
        <>
            <h1 className={ s.title }>Favorites</h1>
            { favorites.length >= 5 &&
                <div className={ s.buttonContainer }>
                    <button className={ s.button } type="submit" onClick={ handleDeleteFavorites }>Очистить
                        избранное
                    </button>
                </div> }
            <div className={ s.favorites }> { favoritesEl }</div>
            { favoriteFavoriteItemsLoading || favoriteCartLoading ? <Preloader/> : null }
        </>
    )
}

export default Favorites;