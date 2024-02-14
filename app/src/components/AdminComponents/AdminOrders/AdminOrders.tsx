import axios from '../../../utils/axios';
import React, { useEffect, useState } from 'react';
import Cheque from './Cheque/Cheque';

const AdminOrders = () => {

    const [orders,setOrders] = useState<any>([])
    const [filter, setFilter] = useState<number>(1)


    useEffect(() => {
       
        const getOrders = async () => {
            const data = await axios.post('/admin-panel/orders', { id: filter }).then((item) => {
               setOrders(item.data)
            });


        }


        getOrders()

    },[filter])









    return (
        <div>
            <h1>Заказы</h1>
            <div>
                <button onClick={() => {setFilter(1)}}>Активные</button>
                <button onClick={() => {setFilter(2)}}>Оплаченные</button>
            </div>
            <div>
                {orders.length > 0 && (
                    <div>
                        {orders.map((item : any) => (
                            <Cheque id={item.id} total_cheque={item.total_cheque} date={item.date}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;