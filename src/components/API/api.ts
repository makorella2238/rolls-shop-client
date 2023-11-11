import axios from "axios";
import {IMenuItem} from "../../../types";
import {IOrder} from "../hooks/order";

// Создаем свой axios с нужными нами нстройками
const instance = axios.create({
    //В get запросах вторым параметром мы передаем авторизованность логин пароль
    withCredentials: true,
    // baseURL: process.env.server_URI || "http://localhost:3200/api/",
    baseURL: "https://tiny-gold-pigeon-boot.cyclic.app/api",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`;
    }
    return config;
});


export const catalog_requests = {
    async getMenu() {
        const response = await instance
            .get("menu");
        return response.data
    },
    async getMenuElements(categoryId: number) {
        if (categoryId < 6) {
            const response = await instance
                .get("menu/all?category=" + categoryId);
            return response.data
        }
    },
    async getMenuItems(titleItem: string | undefined) {
        const response = await instance
            .get<[]>('menu/' + titleItem);
        return response.data;
    },
    async getMenuItem(titleItem: string, id: string) {
        const response = await instance
            .get<[]>('menu/' + titleItem + '/' + id);
        return response.data;
    },
}

export const favorite_request = {

    async toggleFavorites({
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
                          }: IMenuItem) {
        const response = await instance
            .post('favorite', {
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
        return response;
    },
    async getFavoritesItems() {
        const response = await instance
            .get("favorites");
        return response.data;
    },
    async getTotalFavoritesCount() {
        return await instance.get('totalFavoritesCount');
    },
    async deleteFavoriteItems() {
        return await instance.delete('favorites');
    },
}

export const cart_requests = {

    // @ts-ignore
    async create({oldId, img, title, weight, price, details, category}) {
        await instance.post('cart', {oldId, img, title, weight, price, details, category})
    },
    async getCart() {
        const response = await instance.get("cart")
        return response.data
    },
    async getTotalCartPrice() {
        const response = await instance.get("cart/totalPrice")
        return response.data
    },
    async delete(id: string) {
        await instance.delete(`cart/${ id }`);
    },
    async deleteAll() {
        await instance.delete('cart/deleteAll');
    },
    // @ts-ignore
    async updateQuantity({id, value}) {
        await instance.put(`cart/${ id }`, {value});
    },

}

// @ts-ignore
export const auth_request = {
    // @ts-ignore
    async login({password, username}) {
        const response = await instance.post("auth/login", {password, username});
        return response.data
    },
    // @ts-ignore
    async registration({password, username}) {
        const response = await instance.post("auth/registration", {password, username});
        return response.data
    },
    // @ts-ignore
    async changePassword({currentPassword, newPassword}) {
        const response = await instance.post("auth/changePassword", {currentPassword, newPassword});
        return response.data
    }
}

export const profile_request = {
    // @ts-ignore
    async updateProfile({firstName, lastName, phone, email}) {
        const response = await instance.post("profile", {firstName, lastName, phone, email});
        return response.data
    },
    async getProfile() {
        const response = await instance.get('profile');
        return response.data
    },
    async deleteProfile() {
        const response = await instance.delete('profile');
        return response.data
    },
}

export const order_request = {
    async getOrder() {
        const response = await instance.get('order');
        return response.data
    },
    async createOrder({aboutDelivery, cartItems, price, date}: IOrder) {
        const response = await instance.post('order', {aboutDelivery, cartItems, price, date});
        return response.data
    },
}
