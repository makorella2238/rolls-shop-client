import React from "react";
import {ICartItem, IMenuElement, IMenuItem} from "../../../types";
// @ts-ignore
import s from '../BaseComponent/BaseComponent.module.css'
import BaseComponentItem from "../BaseComponent/BaseComponentItem/BaseComponentItem.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";

interface MenuElementsProps {
    menuItems: IMenuElement[];
    handleToggleFavorite: (item: IMenuItem) => void;
    handleCreateCartItem: (item: ICartItem) => void;
    isAuth: boolean;
    favoriteItems: IMenuItem[];
    menuRef: never;
    menuElementsCartLoading: boolean
    menuElementsFavoriteLoading: boolean
    setMenuElementsCartLoading: React.Dispatch<React.SetStateAction<boolean>>
    setMenuElementsFavoriteLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuElements = ({
                          menuRef,
                          handleCreateCartItem,
                          handleToggleFavorite,
                          isAuth,
                          menuItems,
                          favoriteItems,
                          menuElementsFavoriteLoading,
                          menuElementsCartLoading,
                          setMenuElementsCartLoading,
                          setMenuElementsFavoriteLoading
                      }: MenuElementsProps) => {
    const menuElements = menuItems.map(item => {
        return (
            <React.Fragment key={ item.category }>
                <h1 className={ s.title }>{ item.category }</h1>
                { item.items.map(el => {
                    const isFavorite = favoriteItems.some(favorite => favorite.oldId === el._id);
                    return (
                        <BaseComponentItem
                            key={ el._id }
                            menuItem={ el }
                            isFavorite={ isFavorite }
                            isAuth={ isAuth }
                            handleCreateCartItem={ handleCreateCartItem }
                            handleToggleFavorite={ handleToggleFavorite }
                            category={ item.category.toLowerCase() }
                            setMenuElementsCartLoading={ setMenuElementsCartLoading }
                            setMenuElementsFavoriteLoading={ setMenuElementsFavoriteLoading }
                        />
                    );
                }) }
            </React.Fragment>
        );
    });

    return (
        <>
            <div  className={ s.menu }> { menuElements }</div>
            { menuElementsFavoriteLoading || menuElementsCartLoading ? <Preloader/> : null }
            <div className={s.none} ref={ menuRef }></div>
        </>
    );
};
export default MenuElements;