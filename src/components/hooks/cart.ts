import {useMutation, useQuery, useQueryClient} from "react-query";
import {cart_requests} from "../API/api.ts";

export const useGetTotalCartPrice = (setUsername: React.Dispatch<React.SetStateAction<string>>, setIsAuthFalse: {
    (): void;
    (): void;
}) => {

    return useQuery('getTotalCartPrice', cart_requests.getTotalCartPrice, {
        onSuccess: (data) => {
            if (data.userData.username) {
                setUsername(data.userData.username)
            }
        }, onError: (err) => {
            console.log(err)
            setIsAuthFalse()
            localStorage.removeItem('token')
        }
    })
}
export const useGetCartItems = () => {
    return useQuery('getCart', cart_requests.getCart)
}

interface CartItem {
    _id: string
    img: string;
    title: string;
    weight: number;
    price: number;
    details: string;
    category: string;
}

export const useCreateCartItem = (
    setCreateCartLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateCartOneElLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setFavoriteCartLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setMenuElementsCartLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const queryClient = useQueryClient();

    const createCartItem = useMutation(cart_requests.create, {
        onSuccess: () => {
            if (setCreateCartLoading) {
                setCreateCartLoading(false)
            }
            if (setCreateCartOneElLoading) {
                setCreateCartOneElLoading(false)
            }
            if (setFavoriteCartLoading) {
                setFavoriteCartLoading(false)
            }
            if (setMenuElementsCartLoading) {
                setMenuElementsCartLoading(false)
            }

            // queryClient.invalidateQueries(['menuItem', category])
            queryClient.invalidateQueries('getCart')
            queryClient.invalidateQueries('getTotalCartPrice')
        },
    });
    // @ts-ignore
    const handleCreateCartItem = ({oldId, img, title, weight, price, details, category}: CartItem) => {
        createCartItem.mutate({oldId, img, title, weight, price, details, category});
        debugger
    };

    return {handleCreateCartItem}
}


export const useDeleteCartItem = (setDeleteLoading?: React.Dispatch<React.SetStateAction<boolean>>, setDeleteCartLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();

    const deleteCartItem = useMutation(cart_requests.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            queryClient.invalidateQueries('getTotalCartPrice')
            if (setDeleteLoading) {
                setDeleteLoading(false)
            }
            if (setDeleteCartLoading) {
                setDeleteCartLoading(false)
            }
        },
    });

    const handleDelete = (itemId: string) => {
        deleteCartItem.mutate(itemId);
    };

    return {handleDelete};
};


export const useDeleteAllCartItems = (setDeleteAllError: React.Dispatch<React.SetStateAction<string>>) => {
    const queryClient = useQueryClient();

    const deleteAll = useMutation(cart_requests.deleteAll, {
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            queryClient.invalidateQueries('getTotalCartPrice');
        },
        onError: (error) => {
            // @ts-ignore
            setDeleteAllError(error.response.data.message);
        },
    });


    const handleDeleteAll = () => {
        deleteAll.mutate();
    };

    return {handleDeleteAll};
};

export const useUpdateCartItemCount = (setChangeCountLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();

    const updateCartItemCount = useMutation(cart_requests.updateQuantity, {
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            queryClient.invalidateQueries('getTotalCartPrice');
            setChangeCountLoading(false)
        },
    });

    const handleCartItemCount = (id: string, value: number) => {
        updateCartItemCount.mutate({id, value});
    };

    return {handleCartItemCount};
};