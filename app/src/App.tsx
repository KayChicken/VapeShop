import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from './components/Container/Container';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Catalog from './components/Category/Catalog';
import Cart from './components/Cart/Cart';
import CartOffer from './components/CartOffer/CartOffer';
import FullItem from './components/FullItem/FullItem';
import Scale from './components/Scale/Scale';
import { useDispatch } from 'react-redux'
import { fetchAuthMe } from './store/slices/authSlice';
import ModalWindow from './components/ModalWindow/ModalWindow';
import AdminPanel from './components/AdminComponents/AdminPanel/AdminPanel';
import FullCheque from './components/AdminComponents/AdminOrders/FullCheque/FullCheque';


function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])



  return (

    <div className="App">
      <Header />
      <main>
        <ModalWindow/>
        <Container>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart-offer' element={<CartOffer />} />
            <Route path='/full-item/:id' element={<FullItem />} />
            <Route path='/scale' element={<Scale />} />
            <Route path='/admin-panel/*' element={<AdminPanel/>}/>
            <Route path='/admin-panel/orders/:id' element={<FullCheque/>}/>
          </Routes>
        </Container >
      </main>
      <Footer />
    </div>


  );
}

export default App;
