import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import { setStatus } from '../../store/slices/moduleWindowSlice';


interface FormValues {
    name: string;
    surname: string;
    vk: string;
    tg : string;
    phone: string;
    city: string;
    address: string;
}






const CartOffer = () => {


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Поле "Имя" обязательно для заполнения').min(2, "Имя должно быть больше двух буква"),
        surname: Yup.string().required('Поле "Фамилия" обязательно для заполнения').min(2, "Фамлиия должна быть больше двух букв"),
        city: Yup.string().required('Поле "Город" обязательно к заполнению').min(2, "Город должен быть больше двух буква"),
        address: Yup.string().required('Поле "Адрес ПВЗ СДЭК или свой адрес" обязательно к заполнению').min(2, "Адресс должен быть больше двух букв"),
        vk: Yup.string().required('VK" обязательно к заполнению').min(2, "Укажите URL или id"),
        phone: Yup.string().matches(/^[7-8]\d{10}$/, 'Введите правильный российский номер телефона, начиная с 7 или 8 и содержащий 11 цифр').required('Поле "Телефон" обязательно к заполнению')

    });



    const {cart} = useSelector((state: RootState) => state.cart)
    const {data} = useSelector((state : RootState) => state.auth)
    const dispatch = useDispatch()



    const handleOrder = async (values : FormValues) => {
        if (data) {
            const info = {
                "cart" : cart,
                "userId" : data.id,
                "name" : values.name,
                "surname" : values.surname,
                "city" : values.city,
                "address" : values.address,
                "vk" : values.vk,
                "tg" : values.tg,
                "phone" : values.phone

            }
            const response = await axios.post('/order-send', info).then((data) => {
                dispatch(setStatus(data.status))
            }).catch((e) => {
                dispatch(setStatus(e.status))
            })
           
            
        }
       
        
    }



    return (
        <section className="cart-offer">
            <h1 className='offer-header'>Оформление заказа</h1>
            <div className="cart__items">

            </div>
            <Formik
                initialValues={{
                    name: 'Dmitry',
                    surname: 'Alenivus',
                    vk: 'vk.com',
                    tg : 'tg.com',
                    phone: '79251896543',
                    city: 'podolsk',
                    address: 'SDEK pirogovski'
                }}
                validationSchema={validationSchema}
                onSubmit={(values : FormValues, actions) => {
                    // Обработка отправки данных формы
                    actions.setSubmitting(false);
                    handleOrder(values)

                }}
            >
                <Form>
                    
                    <div className="offer__container">
                        <h2>Контакты</h2>
                        <div className='form-container'>
                            <div className='form-input'>
                                <label htmlFor="name">Имя:</label>
                                <Field type="text" name="name" placeholder="Имя" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="surname">Фамилия:</label>
                                <Field type="surname" name="surname" placeholder="Фамилия" />
                                <ErrorMessage name="surname" component="div" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="vk">VK:</label>
                                <Field type="vk" name="vk" placeholder="URL или ID" />
                                <ErrorMessage name="vk" component="div" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="tg">TG:</label>
                                <Field type="tg" name="tg" placeholder="ID" />
                                <ErrorMessage name="tg" component="div" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="phone">Номер телефона:</label>
                                <Field type="phone" name="phone" placeholder="Номер телефона" />
                                <ErrorMessage name="phone" component="div" />
                            </div>
                        </div>
                    </div>
                    <div className="offer__container">
                        <h2>Доставка</h2>
                        <div className="form-container">
                            <div className='form-input'>
                                <label htmlFor="city">Город:</label>
                                <Field type="city" name="city" placeholder="Город" />
                                <ErrorMessage name="city" component="div" />
                            </div>
                            <div className='form-input'>
                                <label htmlFor="address">Адрес ПВЗ СДЭК или свой адрес:</label>
                                <Field type="address" name="address" placeholder="Адресс СДЭК или свой" />
                                <ErrorMessage name="address" component="div" />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='submit-offer-btn'>Отправить</button>
                </Form>
            </Formik>
        </section>
    );
};

export default CartOffer;