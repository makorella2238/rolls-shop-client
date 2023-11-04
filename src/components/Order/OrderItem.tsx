import {useState} from "react";
import {IOrder} from "../hooks/order.ts";
import {Link} from "react-router-dom";
// @ts-ignore
import s from './OrderItem.module.css'

interface OrderItemProps {
    orderItem: IOrder
}

const OrderItem = ({orderItem}: OrderItemProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={s.orderItem} onClick={ toggleExpanded }>
            <div className={s.orderSummary}>
                <h3>Заказ #{ orderItem._id}</h3>
                <p>Дата: { orderItem.date }</p>
                <p>Статус: Готов</p>
            </div>
            { expanded && (
                <div className={s.orderDetails}>
                    <h4>Детали заказа:</h4>
                    <ul>
                        { orderItem.cartItems.map((item) => (
                            <li key={ item.oldId }>
                                <Link to={`/menu/${item.category}/${item.oldId}`}>
                                    <img src={ item.img } alt={ item.title }/>
                                </Link>
                                <div>
                                    <h5>{ item.title }</h5>
                                    {item.details ? (
                                        isNaN(parseInt(item.details)) ? (
                                            <p>Вкус: {item.details}</p>
                                        ) : (
                                            <p>Количество в порции: {item.details}</p>
                                        )
                                    ) : (
                                        <p>Вес: {item.weight}</p>
                                    )}
                                    <p>Количество: { item.quantity }</p>
                                </div>
                            </li>
                        )) }
                    </ul>
                    <p>Общая стоимость: { orderItem.price.totalCartPrice }</p>
                </div>
            ) }
        </div>
    );
};

export default OrderItem;