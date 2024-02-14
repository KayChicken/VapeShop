import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../utils/axios';

interface IFullChequeProps {

}




const FullCheque: React.FC<IFullChequeProps> = () => {

    const { id } = useParams();
    const [order, setOrder] = useState<any>([])

    useEffect(() => {
        const getOrder = async () => {
            const data = await axios.get(`/admin-panel/orders/${id}`).then((item) => {
                console.log(item.data)
                setOrder(item.data)
            })
        }

        getOrder()
    }, [id])




    return (
        <div>
            {Object.keys(order).length > 0 ?
                (
                    <div className='full-cheque'>
                        <div className='user-info'>
                            <h3>Личная информация</h3>
                            <div>
                                <div>Имя : {order.name}</div>
                                <div>Фамилия : {order.surname}</div>
                                <div>Город : {order.city}</div>
                                <div>Пункт выдачи : {order.address}</div>
                                <div>ВК : {order.vk}</div>
                                <div>Телеграмм : {order.tg}</div>
                                <div>Телефон : {order.phone}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <h3>Заказы:</h3>
                            {order.products.map((item: any) => (
                                <div className='orders-container' style={{marginTop: '10px'}}>
                                    <div>Название: {item.name}</div>
                                    <div>Цена: {item.price}</div>
                                    <img src={`/img/liquid/${item.img}`} alt="item-img" width='100px' />
                                    <div>
                                        Аттрибуты:
                                        {Object.entries(item.attributes).map(([attribute, value]) => (
                                            <div key={attribute}>
                                                {`${attribute}: ${value}`}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        Допы:
                                        {Object.entries(item.dops).map(([dopName, values]) => (
                                            <div key={dopName}>
                                                {`${dopName} : ${values}`}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <h3>Цена Заказа:</h3>
                            {order.total_price}
                        </div>
                    </div>
                )
                : (<>Загрузка...</>)}
        </div>
    );
};

export default FullCheque;