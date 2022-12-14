import React, {useEffect} from 'react'
import Products from '../../components/products/Products';
import Slider from '../../components/slider/Slider'

const Home = () => {

  const url = window.location.href;

  //Wen page loads scroll to #products section if we come from backButton from Product Details page
  useEffect(() => {
    const scrollToProducts = () => {
      if(url.includes('#products')){
        window.scrollTo({
          top: 700,
          behavior: 'smooth'
        })
        return;
      }
    }
    scrollToProducts();
  },[url])


  return (
    <div>
      <Slider/>
      <Products/>
    </div>
  )
}

export default Home;