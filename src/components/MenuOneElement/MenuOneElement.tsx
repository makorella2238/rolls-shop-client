import {ICartItem, IMenuItem} from "../../../types.ts";
import {useState} from "react";
import AuthModal from "../AuthModal/AuthModal.tsx";
// @ts-ignore
import s from './MenuOneElement.module.css';
// @ts-ignore
import c from '././../BaseComponent/BaseComponentItem/BaseComponentItem.module.css'
import {getInitialValue} from "../BaseComponent/BaseComponentItem/BaseComponentItem.tsx";
import Counter from "../common/Counter/Counter.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";

interface MenuOneElementProps {
    menuItem: IMenuItem
    handleCreateCartItem: void
    isAuth: boolean
    cartItems: ICartItem[] | undefined
    category: string
    createCartLoading: boolean
    setCreateCartLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuOneElement({
                                   isAuth,
                                   handleCreateCartItem,
                                   menuItem,
                                   cartItems,
                                   category,
                                   setCreateCartLoading,
                                   createCartLoading
                               }: MenuOneElementProps) {

    const initialCount = getInitialValue(menuItem?.count, 0);
    const [selectedCount, setSelectedCount] = useState(initialCount);

    const initialTaste = getInitialValue(menuItem.taste, '')
    const [selectedTaste, setSelectedTaste] = useState(initialTaste);

    const [isModal, setIsModal] = useState(false);

    const itemInCart = cartItems?.find(el => {
        if (el.oldId === menuItem._id) {
            if (el.details) {
                return el.details === selectedCount.toString() || el.details === selectedTaste;
            } else {
                return el
            }
        }
    });

    const menuItemPrice = typeof menuItem.price === 'number'
        ? menuItem.price
        : Array.isArray(menuItem.price) && menuItem.price.length > 0
            // @ts-ignore
            ? menuItem.price[selectedCount]
            : (typeof menuItem.price === 'object')
                ? menuItem.price[selectedCount]
                : null;


    const handleCartClick = () => {
        if (isAuth) {
            const details = selectedTaste || selectedCount
            const {_id, img, weight, title} = menuItem
            setCreateCartLoading(true)
            if (details) {
                // @ts-ignore
                handleCreateCartItem({oldId: _id, img, title, weight, price: menuItemPrice, details, category})
            } else {
                // @ts-ignore
                handleCreateCartItem({oldId: _id, img, title, weight, price: menuItemPrice, category})
            }
        } else {
            setIsModal(true)
        }
    }


    return (
        <>
            { isModal && <AuthModal/> }
            <div className={ s.elementContainer }>
                <div className={ s.imgContainer }>
                    <img className={ s.img } src={ menuItem.img } alt={ menuItem.title }/>
                </div>
                <div className={ s.contentContainer }>
                    <div className={s.border}>
                        <p className={ s.title }>{ menuItem.title }</p>
                        <div className={ s.buttonPrice }>
                            <p className={ s.price }>{ menuItemPrice }р</p>
                            { !itemInCart &&
                                <button className={ `${ c.getButton } ${ s.cartButton }` } onClick={ handleCartClick }>В
                                    корзину
                                </button> }
                            { itemInCart && <Counter el={ itemInCart }/> }
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
                    </div>
                    <i className={ s.weight }>{ menuItem.weight }</i>
                    <p className={ s.description }>{ menuItem.description }</p>
                </div>
            </div>
            { createCartLoading && <Preloader/> }
        </>
    )
}