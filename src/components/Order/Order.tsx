import {IOrder} from "../hooks/order.ts";
// @ts-ignore
import s from '../Favorites/Favorites.module.css'
import {Link} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader.tsx";
import OrderItem from "./OrderItem.tsx";

interface OrderProps {
    orderItems:IOrder[]
    isLoading: boolean
}

function Order({orderItems, isLoading}: OrderProps) {

    if (orderItems.length === 0) {
        return (
            <div className={ s.empty }>
                <p>Вы еще не совершали заказ</p>
                <Link to="/" className={ s.link }>Перейти в меню</Link>
            </div>
        )
    }

    const ordersEl = orderItems.map((item) =>
        <OrderItem orderItem={item} key={item._id}/>)

    return (
        <>
            <h1 className={ s.title }>История заказов</h1>
            <div className={ s.orders }> { ordersEl }</div>
            { isLoading && <Preloader/>}
        </>
    )
}

export default Order;