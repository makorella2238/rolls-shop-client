import {ICartItem} from "../../../types.ts";
// @ts-ignore
import s from './Cart.module.css'
// @ts-ignore
import deleteItem from '../../../public/Icon/delete-icon.svg'
// @ts-ignore
import infoIcon from '../../../public/Icon/info-icon.svg'
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Counter from "../common/Counter/Counter";
import React, {useState} from "react";
import AuthModal from "../Modal/Modal";
import {IProfile} from "../hooks/profile";
import {IOrder} from "../hooks/order";
import Preloader from "../common/Preloader/Preloader";

interface CartProps {
    cartItem: ICartItem[]
    handleDelete: (id: string | undefined) => void
    handleDeleteAll: () => void;
    deleteAllError?: string
    profile: IProfile
    сreateOrderLoading: boolean
    setCreateOrderLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleCreateOrderItems: ({aboutDelivery, cartItems, price}: IOrder) => void
    successCreateOrder: boolean
    setSuccessCreateOrder: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteCartLoading: React.Dispatch<React.SetStateAction<boolean>>
    deleteCartLoading: boolean
}

const Cart = ({
                  handleDelete, handleDeleteAll,
                  cartItem, deleteAllError,
                  profile, сreateOrderLoading,
                  setCreateOrderLoading, handleCreateOrderItems,
                  successCreateOrder, setSuccessCreateOrder,
                  setDeleteCartLoading, deleteCartLoading
              }: CartProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [infoModal, setInfoModal] = useState(false)

    let cartPrice = 0; // Общая стоимость корзины

    const cartItems = cartItem.map(el => {
        const handleDeleteCartItems = () => {
            setDeleteCartLoading(true)
            handleDelete(el._id)
        }

        const details = el.details ? el.details : el.weight;
        const itemPrice = el.price * el.quantity;
        cartPrice += itemPrice;
        return (
            <div className={ s.item } key={ el._id }>
                <div className={ s.imgTitleBlock }>
                    <Link to={ `/menu/${ el.category }/${ el.oldId }` }>
                        <img className={ s.img } src={ el.img } alt={ el.title }/>
                    </Link>
                    <div className={ s.aboutByItem }>
                        <p className={ s.cartItemTitle }>{ el.title }</p>
                        <p className={ s.description }>{ details }</p>
                        <p className={ s.price }>{ el.price + 'р' }</p>
                    </div>
                </div>
                <img onClick={handleDeleteCartItems} className={ s.delete } src={ deleteItem }
                     alt='deleteItem'/>
                <Counter el={ el } cartPage={ true }/>
            </div>
        );
    });

    const [isAuthModal, setIsAuthModal] = useState(false)

    function onHandleSubmit(data: never) {
        if (cartItem.length === 0) {
            setIsAuthModal(true)
        } else {

            const orderItems = cartItem.map((el) => {
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {_id, __v, ...rest} = el;
                return rest;
            });
            const newCartItems = {
                aboutDelivery: data,
                cartItems: orderItems,
                price: {
                    delivery: delivery,
                    cartPrice: cartPrice,
                    totalCartPrice: totalCartPrice
                }
            };
            // @ts-ignore
            handleCreateOrderItems({...newCartItems})
            setCreateOrderLoading(true)
            setSuccessCreateOrder(false)
        }
    }


    let delivery = cartPrice >= 600 ? 0 : 200
    delivery = cartItem.length === 0 ? 0 : delivery
    const totalCartPrice = cartPrice + delivery

    const nameValidation = {
        required: "Поле имени обязательно для заполнения",
        maxLength: {
            value: 20,
            message: "Имя не может быть длиннее 20 символов"
        }
    };

    const lastNameValidation = {
        required: "Поле Фамилии обязательно для заполнения",
        maxLength: {
            value: 20,
            message: "Фамилия не может быть длиннее 20 символов"
        }
    };
    const phoneValidation = {
        required: "Поле телефона обязательно для заполнения",
        pattern: {
            value: /^\+7\d{10}$/,
            message: "Некорректный формат телефона (+7 и 10 цифр)"
        }
    };
    const commentValidation = {
        maxLength: {
            value: 300,
            message: "Кометраний должен быть не более 300 символов"
        }
    };

    const fields = [
        {label: "Имя", name: "firstName", validation: nameValidation},
        {label: "Фамилия", name: "lastName", validation: lastNameValidation},
        {label: "Телефон", name: "phone", validation: phoneValidation},
        {label: "Коментарий", name: "comment", validation: commentValidation}
    ];

    return (
        <>
            <h1>Корзина</h1>
            <div className={ s.cartPage }>
                <div className={ s.order }>
                    <h1 className={ s.title }>Оформление заказа</h1>
                    <form className={ s.form } onSubmit={ handleSubmit(onHandleSubmit) }>

                        <div className={ s.formItem }>
                            <label htmlFor="city">Выберите город</label>
                            <select id="city" { ...register("city", {required: true}) }>
                                <option value="Набережные Челны">Набережные Челны</option>
                                <option value="Казань">Казань</option>
                                <option value="Нижникамск">Нижникамск</option>
                                <option value="Ижевск">Ижевск</option>
                            </select>
                        </div>

                        <div className={ s.formItem }>
                            <label htmlFor="payment">Оплата</label>
                            <select id="payment" { ...register("payment") }>
                                <option value="card">Картой</option>
                                <option value="cash">Наличными</option>
                            </select>
                        </div>

                        { fields.map((field) => (
                            <div className={ s.formItem } key={ field.name }>
                                <label htmlFor={ field.name } className={ errors[field.name] && s["error-label"] }>
                                    { field.label }
                                </label>
                                <input type="text" id={ field.name }
                                       defaultValue={ profile[field.name] ? profile[field.name] : null } { ...register(field.name, field.validation) } />
                                { errors[field.name] && (
                                    <span className={ s.error }>
                                        { errors[field.name].message }
                                        { errors[field.name].maxLength && ` ${ errors[field.name].maxLength.message }` }
                                    </span>
                                ) }
                            </div>
                        )) }
                        <button className={ s.button }>Заказать</button>
                    </form>
                </div>

                <div className={ s.cartItems }>
                    <div className={ s.headerOrder }>
                        <h1 className={ s.title }>Ваш заказ</h1>
                        <p className={ s.deleteAll } onClick={ handleDeleteAll }>Очистить корзину</p>
                    </div>
                    <p className={ s.error }>{ deleteAllError }</p>
                    <div className={ s.cartElements }>
                        { cartItems }
                        { cartItem.length === 0 &&
                            <div className={ s.empty }>
                                <p>У вас нет товаров в корзине</p>
                                <Link to="/" className={ s.link }>Перейти в меню</Link>
                            </div>
                        }
                        <div className={ s.aboutCartPlay }>
                            <div className={ s.aboutCartItem }>
                                <p className={ s.aboutCartPrice }>К оплате: </p>
                                <p className={ s.totalPrice }>{ cartPrice + 'p' }</p>
                            </div>
                            <div className={ s.aboutCartItem }>
                                <div className={ s.delivery }>
                                    <p className={ s.aboutCartPrice }>Доставка:</p>
                                    <div className={ s.aboutDelivery }>
                                        <img className={ s.infoIcon } src={ infoIcon } alt="infoIcon"
                                             onClick={ () => infoModal ? setInfoModal(false) : setInfoModal(true) }/>
                                        { infoModal &&
                                            <p className={ s.infoModal }>При покупке товара на сумму 600 рублей и выше -
                                                расходы на доставку берем на себя</p> }
                                    </div>
                                </div>
                                <p className={ s.totalPrice }>{ delivery + 'p' }</p>

                            </div>
                            <div className={ s.aboutCartItem }>
                                <p className={ s.aboutCartPrice }>Итого:</p>
                                <p className={ s.totalPrice }>{ totalCartPrice + 'p' }</p>
                            </div>

                        </div>
                    </div>
                </div>
                { isAuthModal && <AuthModal title='Заказ не может быть пустым'
                                            description='Что бы совершить заказ необходимо наполнить корзину'/> }
                { successCreateOrder && <AuthModal
                    title='Заказ успешно совершен'
                    successfulOperation={ true }
                    setSuccessCreateOrder={ setSuccessCreateOrder }
                /> }
                { сreateOrderLoading && <Preloader/> }
                { deleteCartLoading && <Preloader/>}
            </div>
        </>
    )
};

export default Cart;