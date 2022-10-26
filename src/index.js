import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BaiTapForm from './Pages/BaiTapForm';
import BookingTicket from './Pages/BookingTicket/BookingTicket';
import Form from './Pages/Form';
import Layout from './Pages/Layout';
import { store } from './redux/ConfigStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='' element={<Layout/>}>
    <Route index element={<Form/>}></Route>
      <Route path='form' element={<Form/>}></Route>
      <Route path='baitapform' element={<BaiTapForm/>}></Route>
      <Route path='bookingticket' element={<BookingTicket/>}></Route>
    </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

