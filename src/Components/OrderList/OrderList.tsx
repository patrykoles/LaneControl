import React from 'react'
import { OrderGet } from '../../Models/Order'
import OrderListItem from '../OrderListItem/OrderListItem'

type Props = {
    orders: OrderGet[]
}

const OrderList = ({ orders }: Props) => {
    return (
        <div>
          {orders
            ? orders.map((order) => {
                return <OrderListItem order={order} />;
              })
            : ""}
        </ div>
      );
}

export default OrderList