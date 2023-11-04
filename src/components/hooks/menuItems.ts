import {useQuery} from "react-query";
import {catalog_requests} from "../API/api.ts";

export const useGetMenuItems = (title: string | undefined) => {
    return useQuery(['menuItems', title], () => catalog_requests.getMenuItems(title)
    )
}
export const useGetMenuElements = (categoryId: number) => {
        return useQuery(['menuElements', categoryId], () => catalog_requests.getMenuElements(categoryId))
}
export const useGetMenuItem = (title: string, id: string) => {
    return useQuery(['menuItem', title, id], () => catalog_requests.getMenuItem(title, id))
}
