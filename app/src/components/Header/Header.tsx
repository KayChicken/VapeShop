import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Authorization from '../Authorization/Authorization';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { exitAccount, selectIsAuth } from '../../store/slices/authSlice';

const Header = () => {

    const [loginModal, setLoginModal] = useState<boolean>(false)
    const isAuth = useSelector(selectIsAuth)
    const { data } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    return (
        <header className='header'>
            <div className="container">
                <div className="header__inner">
                    <Link to="/">
                        <div className="header__logo">
                            <img src="/img/logo.png" alt="logo.png" />
                            <h1>Tesla <br />Labz</h1>
                        </div>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" className='link under-line'>Главная</Link>
                            </li>
                            <li>
                                <Link to="/catalog" className='link under-line'>Каталог</Link>
                            </li>
                            <li>
                                <a href="https://vk.com/tesla_labz" target="_blank" rel="noopener noreferrer" className='link under-line'>Новости</a>
                            </li>
                            <li>
                                <a href="https://blog.teslalabz.com/" target="_blank" rel="noopener noreferrer" className='link under-line'>Статьи</a>
                            </li>
                        </ul>
                    </nav>
                    <Link to="/cart" className=''>
                        <div className="header__cart">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none">
                                <g clipPath="url(#clip0_5_10)">
                                    <path d="M24.5438 21.1199L28.5821 5.30785H33V2.82242H26.6517L25.6997 6.54984L0 6.53146L2.73226 21.1198H24.5438V21.1199ZM25.0651 9.03484L22.6134 18.6345H4.79539L2.99451 9.01905L25.0651 9.03484Z" fill="white" />
                                    <path d="M21.1415 30.1776C23.3331 30.1776 25.1161 28.3945 25.1161 26.2029C25.1161 24.0113 23.3331 22.2284 21.1415 22.2284H6.1667C3.97509 22.2284 2.19205 24.0113 2.19205 26.2029C2.19205 28.3945 3.97505 30.1776 6.1667 30.1776C8.35834 30.1776 10.1413 28.3945 10.1413 26.2029C10.1413 25.6766 10.0382 25.174 9.85157 24.7138H17.4566C17.2699 25.174 17.1668 25.6766 17.1668 26.2029C17.1669 28.3945 18.9499 30.1776 21.1415 30.1776ZM7.65587 26.2029C7.65587 27.0241 6.98784 27.6922 6.1667 27.6922C5.34555 27.6922 4.67748 27.0241 4.67748 26.2029C4.67748 25.3818 5.34552 24.7138 6.1667 24.7138C6.98784 24.7138 7.65587 25.3818 7.65587 26.2029ZM22.6307 26.2029C22.6307 27.0241 21.9627 27.6922 21.1415 27.6922C20.3204 27.6922 19.6523 27.0241 19.6523 26.2029C19.6523 25.3818 20.3204 24.7138 21.1415 24.7138C21.9627 24.7138 22.6307 25.3818 22.6307 26.2029Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5_10">
                                        <rect width="33" height="33" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <h3>Корзина</h3>
                        </div>
                    </Link>
                    <div className="header__login">
                        {isAuth ?
                            (<>
                                <h3>{data?.login}</h3>
                                <button onClick={() => {dispatch(exitAccount())}}>Выйти</button>
                            </>
                            )
                            : <button className='login' onClick={() => { setLoginModal(!loginModal) }}>Войти</button>}

                    </div>
                    {loginModal ? (<Authorization setLoginModal={setLoginModal} />) : ''}
                </div>
            </div>

        </header>


    );
};

export default Header;