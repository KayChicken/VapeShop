import React, { useState } from 'react';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ReactDOM from 'react-dom'



export interface AuthorizationProps {
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}



const Authorization: React.FC<AuthorizationProps> = ({ setLoginModal }) => {

    const [currentPage, setCurrentPage] = useState<number>(0)
    const node = document.querySelector('#modal__root')
    if (!node) return null



    return ReactDOM.createPortal((
        <section className='authorization'>
            <div className="authorization-modal">
                <button className="close-modal-btn" onClick={() => { setLoginModal(false) }}>
                    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.6665 7.71057L4.99984 4.37723M4.99984 4.37723L1.6665 1.0439M4.99984 4.37723L8.33317 1.0439M4.99984 4.37723L8.33317 7.71057" stroke="#E1322A" stroke-width="2">
                        </path>
                    </svg>
                </button>
                <div className='login-tabs'>
                    <button className={`login-tabs-login ${currentPage === 0 ? 'tab-active' : ''}`} onClick={() => setCurrentPage(0)}>Логин</button>
                    <button className={`login-tabs-registration ${currentPage === 1 ? 'tab-active' : ''}`} onClick={() => setCurrentPage(1)}>Регистрация</button>
                </div>
                <div className='auth-menu'>
                    {currentPage === 0 ? (<Login setLoginModal={setLoginModal} />) : (<Registration />)}
                </div>
            </div>
        </section>
    ), node);
};

export default Authorization;