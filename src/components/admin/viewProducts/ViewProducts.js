import React from "react";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'
import {db,storage} from '../../../firebase/config'
import { query, orderBy } from "firebase/firestore";
import {deleteObject, ref} from 'firebase/storage'
import { collection, doc, setDoc, onSnapshot, deleteDoc  } from "firebase/firestore";
import {Link} from 'react-router-dom'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import Loader from '../../loader/Loader'
import Notiflix from 'notiflix'
import {useDispatch, useSelector} from 'react-redux'
import {selectProducts, STORE_PRODUCTS} from '../../../redux/slice/productSlice'
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import styles from "./ViewProducts.module.scss";
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const {data, isLoading} = useFetchCollection('products')
  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts);
   // Pagination states
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage, setProductsPerPage] = useState(10);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();


  //When page loads we are firing getProducts function

  useEffect(() => {
    dispatch(STORE_PRODUCTS({products: data}))
  },[dispatch, data])

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  //Moving this function into custom hook
  
  // const getProducts = () => {
  //   setIsLoading(true);

  //   try{
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot)
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //     }))
  //       // console.log(allProducts);
  //       setProducts(allProducts);
  //       dispatch(STORE_PRODUCTS({products: allProducts}))
  //       setIsLoading(false)
  //     });

  //   }catch(error) {
  //     setIsLoading(false)
  //     toast.error(error.message);
  //   }
  // }

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete product!',
      'Do you want to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        console.log("Delete canceled.")
      },
      {
        width: '320px',
        borderRadius: '5px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom'
      },
    );
  }

  const deleteProduct = async (id, imageURL) => {

    try{
      await deleteDoc(doc(db, "products", id));
      // https://firebase.google.com/docs/storage/web/delete-files
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Product deleted succesfully')


    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <>
    {isLoading && <Loader/>}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? (
          <p> No products found !</p>
        ) : (
          <table>
            <thead>
          
            <tr>
              <th>S/N</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentProducts.map((product, index) => {
              const {id, name , category, price, imageURL} = product;
              return (
               
                <tr key={id}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <img src={imageURL} alt={name} style={{width: '100px'}}/>
                    </td>
                    <td>
                      {name}
                    </td>
                    <td>
                      {category}
                    </td>
                    <td>
                      {`$${price}`}
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size={20} color='green'/>
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)}/>
                    </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        )}
         <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
