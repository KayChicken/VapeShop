import React from 'react';
import InfoItem from '../InfoItem/InfoItem';
import PalleteItem from '../PalleteItem/PalleteItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // импортируйте стили Swiper
import { Link, Navigate, useNavigate } from 'react-router-dom';




const Main = () => {



    


    return (
        <>
            <section className="banner">
                <Swiper navigation={true} modules={[Navigation]} className="slider" loop={true}>
                    <SwiperSlide className='slider__slide' style={{ backgroundImage: `url('./img/free_cheap_treats.png')` }}></SwiperSlide>
                    <SwiperSlide className='slider__slide' style={{ backgroundImage: `url('./img/free_cheap_treats.png')` }}></SwiperSlide>
                    <SwiperSlide className='slider__slide' style={{ backgroundImage: `url('./img/free_cheap_treats.png')` }}></SwiperSlide>
                </Swiper>
            </section>
            <section className='hero'>
                <h1>Лучшая крафт лаборатория россии!</h1>
                <h2>онлайн магазин ароматики доставит в любую точку страны любимую жъж всего в пару кликов</h2>
                <a href="https://vk.com/tesla_labz" className='tesla-lab'>#teslalabz</a>
                <Link to="/catalog" className='hero__btn'>Хочу</Link>
            </section>
            <section className="choose">
                <h1>Почему клиенты выбирают нас?</h1>
                <div className='choose__items'>
                    <InfoItem img='logo1.png' desc="исключительно лучшее сырьё" />
                    <InfoItem img='logo2.png' desc="честная крепость" />
                    <InfoItem img='logo3.png' desc="настройка вкусов" />
                    <InfoItem img='logo4.png' desc="отправка за день" />
                    <InfoItem img='logo5.png' desc="7/10 забывают про вейпшопы" />
                    <InfoItem img='logo6.png' desc="с 2015 года" />
                </div>
            </section>
            <section className="flavor-palette">
                <h1>Линейки</h1>
                <div className="flavor-palette__items">
                    <PalleteItem img='glock' desc='GLOCK' />
                    <PalleteItem img='cheap-treats' desc='CHEAP TREATS' />
                    <PalleteItem img='molotov' desc='MOLOTOV' />
                </div>
                <Link to="/catalog" className='flavor-palette-btn'>Перейти к каталогу!</Link>
            </section>
           
        </>

    );
};

export default Main;