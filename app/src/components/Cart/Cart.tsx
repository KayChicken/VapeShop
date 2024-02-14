import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store';
import CartItem from './CartItem/CartItem';



const Cart = () => {

    const {cart} = useSelector((state: RootState) => state.cart)

    const dispatch = useDispatch()





    return (
        <section className='cart'>
            <h1>Корзина</h1>
            <div className="cart__inner">
                <div className="cart__left">
                    <div>
                        {cart.length > 0 ? cart
                            .map((item) => (<>
                                <CartItem id={item.id} id_prod={item.id_prod} key={item.name} name={item.name} img={item.img} attributes={item.attributes} quantity={item.quantity} price={item.price} dops={item.dops} />
                            </>))
                            : <h3>Корзина пуста</h3>}
                    </div>
                </div>

            </div>
            <Link to="/cart-offer" className='cart-offer-btn'>Оформить</Link>

        </section>
    );
};

export default Cart;