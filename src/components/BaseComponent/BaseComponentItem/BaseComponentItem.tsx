// @ts-ignore
import s from './BaseComponentItem.module.css'
// @ts-ignore
import back from '../../../assets/back.png'
// @ts-ignore
import cart from '../../../../public/Icon/cart-icon.png'
import React, {useState} from "react";
import {ICartItem, IMenuItem} from "../../../../types.ts";
import AuthModal from "../../AuthModal/AuthModal.tsx";
import {Link} from "react-router-dom";

interface BaseComponentItemProps {
    menuItem: IMenuItem
    handleToggleFavorite: (item: IMenuItem) => void;
    handleCreateCartItem: (item: ICartItem) => void;
    isAuth: boolean
    category?: string
    isFavorite: boolean
    setToggleFavoriteLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setCreateCartLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setFavoriteCartLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setFavoriteFavoriteItemsLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setMenuElementsCartLoading?: React.Dispatch<React.SetStateAction<boolean>>
    setMenuElementsFavoriteLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export function getInitialValue(arrayField: [number] | [string] | undefined, defaultValue: string | number) {
    if (Array.isArray(arrayField) && arrayField.length > 0) {
        return arrayField[0];
    }

    return defaultValue;
}


function BaseComponentItem({
                               isAuth, handleToggleFavorite,
                               handleCreateCartItem, menuItem,
                               category, isFavorite,
                               setToggleFavoriteLoading, setCreateCartLoading,
                               setFavoriteFavoriteItemsLoading, setFavoriteCartLoading,
                               setMenuElementsFavoriteLoading,setMenuElementsCartLoading
                           }: BaseComponentItemProps) {
    const initialCount = getInitialValue(menuItem?.count, 0);
    const [selectedCount, setSelectedCount] = useState(initialCount);

    const initialTaste = getInitialValue(menuItem.taste, '')
    const [selectedTaste, setSelectedTaste] = useState(initialTaste);

    const menuItemPrice = typeof menuItem.price === 'number'
        ? menuItem.price
        : Array.isArray(menuItem.priceDrinks) && menuItem.priceDrinks.length > 0
            // @ts-ignore
            ? menuItem.priceDrinks[selectedCount]
            : (typeof menuItem.prices === 'object' || typeof menuItem.price === 'object')
                // @ts-ignore
                ? menuItem.prices ? menuItem.prices[selectedCount] : menuItem.price[selectedCount]
                : null;

    const handleFavoriteClick = () => {
        if (isAuth) {
            const {_id, img, weight, title, description, taste, count} = menuItem
            let price;
            let prices;
            let priceDrinks;

            if (typeof menuItem.price === 'number') {
                price = menuItem.price;
            }
            if (typeof menuItem.price === 'object') {
                prices = menuItem.price;
            }
            if (Array.isArray(menuItem.price)) {
                priceDrinks = menuItem.price;
            }

            if (prices && priceDrinks) {
                prices = undefined;
            }
            // @ts-ignore
            handleToggleFavorite({oldId:_id, img, weight, title, description, taste, count, category, price, prices, priceDrinks})
            debugger
            if (setToggleFavoriteLoading) {
            setToggleFavoriteLoading(true)
            }
            if (setFavoriteFavoriteItemsLoading) {
                setFavoriteFavoriteItemsLoading(true)
            }
            if (setMenuElementsFavoriteLoading) {
                setMenuElementsFavoriteLoading(true)
            }
        } else {
            setIsModal(true)
        }
    }
    const handleCartClick = () => {
        if (isAuth) {
            const details = selectedTaste || selectedCount
            const {_id, oldId, img, weight, title} = menuItem
            const newCategory = category || menuItem.category
            if (setCreateCartLoading) {
                setCreateCartLoading(true)
            }
            if (setFavoriteCartLoading) {
                setFavoriteCartLoading(true)
            }
            if (setMenuElementsCartLoading) {
                setMenuElementsCartLoading(true)
            }
            if (details) {
                // @ts-ignore
                handleCreateCartItem({oldId: oldId || _id, img, title, weight, price: menuItemPrice, details, category:newCategory})
                debugger
            } else {
                // @ts-ignore
                handleCreateCartItem({oldId: oldId || _id, img, title, weight, price: menuItemPrice, category:newCategory})
                debugger
            }
            setIsDetails(true)
        } else {
            setIsModal(true)
        }
    }

    const [isDetails, setIsDetails] = useState(false)
    const [isModal, setIsModal] = useState(false)

    const inCartTitle = "УРА!!! Теперь" + menuItem.title + ' в корзине'

    return (
        <>
            { isModal && <AuthModal/> }
            { !isDetails && <div className={ s.item }>
                <Link to={ `/menu/${ category || menuItem.category }/${ menuItem.oldId || menuItem._id}` }>
                    <img className={ s.img } src={ menuItem.img } alt={ menuItem.title }/>
                </Link>
                <div className={ s.favorite }>
                    <svg onClick={ () => handleFavoriteClick() } xmlns="http://www.w3.org/2000/svg"
                        //----------------------------- BORDER НА FAVORITE -----------------------------
                         style={ {border: '1px solid gray'} } // добавляем border
                         fill={ isFavorite ? '#E76F51' : '#fff' } viewBox="0 0 24 24" strokeWidth={ 1.5 }
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                </div>
                <p className={ s.title }>{ menuItem.title }</p>
                <i className={ s.weight }>{ menuItem.weight }</i>
                <div className={ s.descriptionContainer }>
                    <p className={ s.description }>{ menuItem.description }</p>
                </div>
                <div className={ s.countButtons }>
                    { menuItem.count?.map((count: number) => (
                        <button
                            style={ menuItem.count?.length === 1 ? {"display": "none"} : {} }
                            key={ count }
                            onClick={ () => setSelectedCount(count) }
                            className={ count === selectedCount ? s.selectedButton : s.button }
                        >
                            { count }
                        </button>
                    )) }
                </div>

                <div className={ s.tasteButtons }>
                    { menuItem.taste?.map((taste: string) => (
                        <button
                            style={ menuItem.taste?.length === 1 ? {"display": "none"} : {} }
                            key={ taste }
                            onClick={ () => setSelectedTaste(taste) }
                            className={ taste === selectedTaste ? s.selectedButton : s.button }
                        >
                            { taste }
                        </button>
                    )) }
                </div>

                <div className={ s.aboutBy }>
                    <p className={ s.price }>Цена: <b>{ menuItemPrice }</b></p>
                    <button className={ s.getButton } onClick={ () => handleCartClick() }>
                        <img className={ s.cart } src={ cart } alt="cart-icon"/>
                    </button>
                </div>
            </div> }
            { isDetails && (
                <div className={ s.item }>
                    <div className={ s.inCartDetails } onClick={ () => setIsDetails(false) }>
                        <img className={ s.backImg } src={ back } alt="Вернуться назад"/>
                    </div>
                    <Link to={ `/menu/${ category || menuItem.category }/${ menuItem.oldId || menuItem._id }` }>
                        <img className={ s.imgInCart } src={ menuItem.img } alt={ menuItem.title }/>
                    </Link>
                    <i className={ s.weight }>{ menuItem.weight }</i>

                    <p className={ s.title }>{ inCartTitle }</p>

                </div>)
            }
        </>
    )
}

export default BaseComponentItem;