import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AdminOrders from '../AdminOrders/AdminOrders';


const AdminPanel = () => {
    return (
        <div>
            <h1>TESLA Админка</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/admin-panel/orders'>Заказы</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/orders' element={<AdminOrders />} />
            </Routes>
        </div>
    );
};

export default AdminPanel;