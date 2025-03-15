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
            ? orders.map((order, index) => {
                return <OrderListItem order={order} orderNumber={index+1}/>;
              })
            : ""}
        </ div>
      );
}

export default OrderList