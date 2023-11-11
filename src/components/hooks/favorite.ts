import {useMutation, useQuery, useQueryClient} from "react-query";
import {favorite_request} from "../API/api.ts";
import {IMenuItem} from "../../../types.ts";
import React from "react";

export const useGetFavoriteItems = (setFavoriteItems?: React.Dispatch<React.SetStateAction<IMenuItem[]>>) => {
    return useQuery('getFavoritesItems', favorite_request.getFavoritesItems, {
        onSuccess: (data) => {
            if (setFavoriteItems) {
                setFavoriteItems(data)
            }
        }
    })
}

export const useGetTotalFavoriteCount = () => {
    return useQuery('totalFavoriteCount', favorite_request.getTotalFavoritesCount)
}
export const useDeleteFavoriteItems = () => {
    const queryClient = useQueryClient();

    const deleteFavoritesMutation = useMutation(favorite_request.deleteFavoriteItems, {
        onSuccess: () => {
            queryClient.invalidateQueries('totalFavoriteCount');
            queryClient.invalidateQueries('getFavoritesItems');
        },
    })
    const handleDeleteFavorites = () => {
        deleteFavoritesMutation.mutate()
    }
    return {handleDeleteFavorites}
}

export const useToggleFavoriteItem = (setToggleFavoriteLoading?: React.Dispatch<React.SetStateAction<boolean>>,
                                      setFavoriteFavoriteItemsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
                                      setMenuElementsFavoriteLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const queryClient = useQueryClient();
    const toggleFavoriteMutation = useMutation(favorite_request.toggleFavorites, {
        onSuccess: () => {
            if (setToggleFavoriteLoading) {
                setToggleFavoriteLoading(false)
            }
            if (setFavoriteFavoriteItemsLoading) {
                setFavoriteFavoriteItemsLoading(false)
            }
            if (setMenuElementsFavoriteLoading) {
                setMenuElementsFavoriteLoading(false)
            }

            queryClient.invalidateQueries(['menuItem'])
            queryClient.invalidateQueries('totalFavoriteCount');
            queryClient.invalidateQueries('getFavoritesItems');

        },
    });
    const handleToggleFavorite = ({
                                      oldId,
                                      img,
                                      weight,
                                      title,
                                      description,
                                      taste,
                                      count,
                                      category,
                                      price,
                                      prices,
                                      priceDrinks
                                  }: IMenuItem) => {
        // @ts-ignore
        toggleFavoriteMutation.mutate({
            oldId,
            img,
            weight,
            title,
            description,
            taste,
            count,
            category,
            price,
            prices,
            priceDrinks
        });
        debugger
    };
    return {handleToggleFavorite}
}