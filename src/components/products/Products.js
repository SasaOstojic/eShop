import React, {useState, useEffect} from 'react'
import styles from './Products.module.scss'
import useFetchCollection from '../../customHooks/useFetchCollection'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import {useDispatch, useSelector} from 'react-redux'
import {STORE_PRODUCTS, GET_PRICE_RANGE, selectProducts} from '../../redux/slice/productSlice'
import spinnerImg from '../../assets/spinner.jpg'
import {FaCogs} from 'react-icons/fa'

const Products = () => {
  const {data, isLoading} = useFetchCollection('products');
  const [showFilter, setShowFilter] = useState(false)
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();


  //When page loads we are firing getProducts function

  useEffect(() => {
    dispatch(STORE_PRODUCTS({products: data}));
    dispatch(GET_PRICE_RANGE({products: data}))
  },[dispatch, data])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }


  return (
    <section>
      <div className={`container ${styles.product}`}>
            <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
              {isLoading ? null : <ProductFilter/>}
            </aside>
            <div className={styles.content}>
              {isLoading ? (<img src={spinnerImg} alt='Loading...' style={{width: '50px'}} className='--center-all'/>) : (<ProductList products = {products}/>)}
              <div className={styles.icon} onClick={ toggleFilter}>
                <FaCogs size={20} color='orangered'/>
                <p>
                  <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
                </p>
              </div>
            </div>
      </div>
    </section>
  )
}

export default Products;