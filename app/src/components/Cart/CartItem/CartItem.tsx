import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCartCount, removeFromCart } from '../../../store/slices/cartSlice';
import { number } from 'yup';


interface CartItemProps {
    id: number,
    id_prod: number,
    name: string,
    img: string,
    attributes: {
        name: string,
        value: string
    }[],
    dops: {
        title: string,
        values: {
            add_id: number;
            name: string;
            price: number;
        }
    }[],
    quantity: number,
    price: number
}


interface DopsGroup {
    [title: string]: {
        add_id: number;
        name: string;
        price: number;
    }[];
}




const CartItem: React.FC<CartItemProps> = ({ id, id_prod, name, img, attributes, quantity, price, dops }) => {

    const [changeMenu, setChangeMenu] = useState<boolean>(false)
    const [changeCount, setChangeCount] = useState<number>(quantity);
    const dispatch = useDispatch()
    const handleCount = (action: string) => {
        switch (action) {
            case 'plus':
                setChangeCount((prevCount) => prevCount + 1)
                break;
            case 'minus':
                if (changeCount !== 1) {
                    setChangeCount((prevCount) => prevCount - 1)
                    break;
                }
        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(e.target.value, 10);
        if (!isNaN(inputValue) && inputValue > 0) {
            setChangeCount(inputValue);
        } else {
            setChangeCount(1);
        }
    }


    const handleChangeCount = (id: number, count: number) => {
        dispatch(changeCartCount({ "id": id, "count": count }))
        setChangeMenu(!changeMenu)
    }


    const showDops = (dops: CartItemProps['dops']) => {

        const newArray = dops.reduce((result, item) => {
            const { title, values } = item;

            if (!result[title]) {
                result[title] = [values];
            } else {
                result[title].push(values);
            }

            return result;
        }, {} as DopsGroup);

        return newArray

    }



    const dopsObjects = showDops(dops)

    const dopsPrice = () => {
        return Object.keys(dopsObjects).reduce((total, item) => {
            return total + dopsObjects[item].reduce((groupTotal, price) => {
                return groupTotal + price.price;
            }, 0);
        }, 0);
    }

    




    return (
        <div className='cart-item'>
            <img className='cart-item__img' src={`/img/liquid/${img}`} alt="" />
            <div className='cart-item__col'>

                <h3 className='cart-item__name'>{name}</h3>
                <div className='cart-item__attributes attributes'>
                    {attributes.map((attribute) => (
                        <>
                            <div className='attributes__values'>{`${attribute.name} : ${attribute.value}`}</div>
                        </>
                    ))}
                </div>
                <div className='cart-item__dops dops'>
                    {Object.keys(dopsObjects).map((title) => (
                        <div key={title} className='dops__values'>{`${title} : ${dopsObjects[title].map((item) => item.name).join(',')}`}</div>
                    ))}

                </div>
            </div>
            <div className='cart-item__col'>
                {!changeMenu ? (
                    <>
                        <div className='cart-item__quantity'>Количество : {quantity} шт.</div>
                        <button className='cart-item__quantity-btn cart-btn' onClick={() => { setChangeMenu(!changeMenu) }}>Изменить</button>
                    </>
                ) :
                    (<>
                        <div className='change-item'>
                            <svg className='change-arrow' onClick={() => { handleCount('minus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88" ><g><polygon points="80.593,0 49.771,0 0,61.44 49.771,122.88 80.593,122.88 30.82,61.44 80.593,0" /></g></svg>
                            <input value={changeCount} className='full-item__count' onChange={(e) => handleInputChange(e)} />
                            <svg className='change-arrow' onClick={() => { handleCount('plus') }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 80.593 122.88" enableBackground="new 0 0 80.593 122.88"><g><polygon points="0,0 30.82,0 80.593,61.44 30.82,122.88 0,122.88 49.772,61.44 0,0" /></g></svg>
                        </div>
                        <button className='cart-btn' onClick={() => { handleChangeCount(id, changeCount) }}>Прменить</button>
                    </>)}
            </div>
            <div className='cart-item__col'>
                <div className='cart-item__price'>Цена : {(price + dopsPrice()) * quantity}р.</div>
                <button className='cart-item__remove cart-btn' onClick={() => { dispatch(removeFromCart(id)) }}>Удалить</button>
            </div>
        </div>
    );
};

export default CartItem;