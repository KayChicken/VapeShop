import React from 'react';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__logo">
                        <img src="/img/logo.png" alt="logo.png" />
                        <h1>Tesla <br />Labz</h1>
                    </div>
                    <div className="footer__time">
                        <h1 className='footer__heading'>Часы обработки заказов</h1>
                        <p>ПН-ПТ: 12:00 - 21:00</p>
                        <p>СБ-ВС: 14:00 - 18:00</p>
                        <p>(московское время, UTC+3)</p>
                        <p>Отправка заказа в течение 24 часов после оплаты, за исключением выходных дней.</p>
                    </div>
                    <div className="footer__contacts">
                        <h1 className='footer__heading'>Контакты</h1>
                        <a href="https://vk.com/tesla_labz">Группа TESLALABZ VK</a>
                        <p>↑Обращаться по любым вопросам</p>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;