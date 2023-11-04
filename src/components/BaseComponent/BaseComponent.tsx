import {ICartItem, IMenuItem} from "../../../types.ts";
// @ts-ignore
import s from "./BaseComponent.module.css";
import BaseComponentItem from "./BaseComponentItem/BaseComponentItem.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";

interface BaseComponentProps {
    menuItems: IMenuItem[];
    title: string;
    handleToggleFavorite: (item: IMenuItem) => void;
    handleCreateCartItem: (item: ICartItem) => void;
    isAuth: boolean;
    favoriteItemsFetching: boolean
    menuItemsFetching: boolean
    favoriteItems: [IMenuItem];
    toggleFavoriteLoading: boolean
    setToggleFavoriteLoading: React.Dispatch<React.SetStateAction<boolean>>
    createCartLoading: boolean
    setCreateCartLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const BaseComponent = ({
                           handleCreateCartItem, handleToggleFavorite,
                           isAuth, title, menuItems, favoriteItems,
                           setCreateCartLoading, createCartLoading,
                           toggleFavoriteLoading, setToggleFavoriteLoading
                       }: BaseComponentProps) => {
    const menuElements = menuItems.map((item: IMenuItem) => {
        const isFavorite = favoriteItems.some(favoriteItems => favoriteItems.oldId === item._id)
        return (
            <BaseComponentItem
                isAuth={ isAuth }
                handleCreateCartItem={ handleCreateCartItem }
                handleToggleFavorite={ handleToggleFavorite }
                category={ title }
                key={ item._id }
                menuItem={ item }
                isFavorite={ isFavorite }
                setToggleFavoriteLoading={ setToggleFavoriteLoading }
                setCreateCartLoading={ setCreateCartLoading }
            />
        );
    });

    return (
        <>
            <h1 className={ s.title }>{ title }</h1>
            <div className={ s.menu }>{ menuElements }</div>
            { toggleFavoriteLoading || createCartLoading ? <Preloader/> : null }
        </>
    );
};

export default BaseComponent;