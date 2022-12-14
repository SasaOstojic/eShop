import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../../components/admin/navbar/NavBar'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import Orders from '../../components/admin/orders/Orders'
import Home from '../../components/admin/home/Home'
import styles from './Admin.module.scss';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <NavBar/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<Home/>}/>
          <Route path='all-products' element={<ViewProducts/>}/>
          <Route path='add-products/:id' element={<AddProducts/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin
