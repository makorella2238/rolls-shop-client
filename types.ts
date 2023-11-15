export interface IMenu {
    _id?: string
    img: string
    title: string
}

export interface IMenuElement {
    category: string
    items: IMenuItem[]
}

export interface ICartItem {
    _id: string
    oldId: string
    img: string
    title: string
    price: number
    weight: string
    quantity: number
    details?: never
    category: string
}

export interface IMenuItem {
    oldId?: string
    _id: string
    img: string
    title: string
    weight: string
    isFavorite: boolean
    category: string
    description: string
    count?: [number]
    taste?: [string]
    price: never
    prices?: IPrice
    priceDrinks?: [number]
}

interface IPrice {
    "4"?: number
    "6"?: number
    "8"?: number
}
