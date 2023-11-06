import {useMutation, useQuery, useQueryClient} from "react-query";
import {order_request} from "../API/api.ts";
import {ICartItem} from "../../../types.ts";
import {useDeleteAllCartItems} from "./cart.ts";

export const useGetOrderItems = () => {
    return useQuery<IOrder[]>('getOrderItems', order_request.getOrder)
}

export interface IOrder {
    aboutDelivery: {
        city: string;
        comment: string;
        firstName: string;
        lastName: string;
        payment: string;
        phone: string;
    }
    cartItems: [ICartItem]
    price: {
        cartPrice: number
        delivery: number
        totalCartPrice: number
    }
    date: string
    _id?: string
}

export const useCreateOrderItems = (setCreateOrderLoading: React.Dispatch<React.SetStateAction<boolean>>, setSuccessCreateOrder: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();
    const {handleDeleteAll} = useDeleteAllCartItems()

    const createOrderItems = useMutation(order_request.createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('getOrderItems')
            setCreateOrderLoading(false)
            setSuccessCreateOrder(true)
            handleDeleteAll()
        },
    });

    const handleCreateOrderItems = ({aboutDelivery, cartItems, price, date}: IOrder) => {
        createOrderItems.mutate({aboutDelivery, cartItems, price, date});
    }
    return {handleCreateOrderItems}
}