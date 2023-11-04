import {memo, useState} from 'react';
// @ts-ignore
import s from './Counter.module.css';
import {ICartItem} from '../../../../types.ts';
import {useDeleteCartItem, useUpdateCartItemCount} from '../../hooks/cart.ts';
import Preloader from "../Preloader/Preloader.tsx";

interface CounterProps {
    el: ICartItem;
    cartPage?: boolean
}

const Counter = memo(({el, cartPage}: CounterProps) => {
    const [changeCountLoading, setChangeCountLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const {handleCartItemCount} = useUpdateCartItemCount(setChangeCountLoading);
    const {handleDelete} = useDeleteCartItem(setDeleteLoading);
    const handleCountChange = (itemId: string, value: number) => {
        if (value === -1 && el.quantity === 1) {
            handleDelete(itemId);
            setDeleteLoading(true)
        } else {
            handleCartItemCount(itemId, value);
            setChangeCountLoading(true)
        }
    };
    const counterClass = cartPage ? s.counter : s.default;
    return (
        <>
            <div className={counterClass}>
                <button
                    className={ s.minus }
                    onClick={ () => handleCountChange(el._id, -1) }
                >
                    -
                </button>
                <p className={ s.inputCount }>{ el.quantity }</p>
                <button
                    className={ s.plus }
                    onClick={ () => handleCountChange(el._id, 1) }
                >
                    +
                </button>
            </div>

            { changeCountLoading && <Preloader/>}
            { deleteLoading && <Preloader/>}
        </>
    );
});

export default Counter;