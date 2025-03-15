export type OrderItemPost = {
    menuItemId: number,
    quantity: number,
    price: number
}

export type OrderItemGet = {
    menuItemId: number,
    orderId: number,
    quantity: number,
    price: number,
    menuItemName: string
}

export type OrderPost = {
    orderItems: OrderItemPost[]
}

export type OrderGet = {
    id: number,
    sumPrice: number,
    orderTime: Date,
    reservationId: number,
    orderItems: OrderItemGet[]
}