import { React, useState } from "react";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import Loader from '../../loader/Loader'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from "react-toastify";
import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore"; 
import {db,storage} from '../../../firebase/config'
import {useSelector} from 'react-redux'
import { getStorage, deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {selectProducts} from '../../../redux/slice/productSlice'

const categories = [
  {id: 1, name: 'Laptop'},
  {id: 2, name: 'Electronics'},
  {id: 3, name: 'Fashion'},
  {id: 4, name: 'Phone'}
]

const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
}

const AddProducts = () => {
  const {id} = useParams();

  //selecting products from redux store
  const products = useSelector(selectProducts)
  //Finding that clicked edited product
  const productEdit = products.find((item) => item.id === id)
  
  const [product, setProduct] = useState({
    ...initialState
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  const detectForm = (id, f1, f2) => {
    if(id === 'ADD'){
      return f1
    }else {
      return f2
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({...product, [name]:value})
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    //Firebase docs
    const storage = getStorage();
    //Path where it is going to be store in firebase
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  }, 
  (error) => {
    toast(error.message);
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product, imageURL: downloadURL})
      toast.success('Image uploaded successfully');
    });
  }
);

  };



  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      setUploadProgress(0)
      setProduct({...initialState})
      toast.success('Products added')
      navigate('/admin/all-products')
    } catch (error) {
      setIsLoading(false)
      toast(error.message)
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage,productEdit.imageURL);
       deleteObject(storageRef);
    }

    try {
       setDoc(doc(db, "products", "LA"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      toast.success('Product edited successfully.')
      navigate('/admin/all-products')
    } catch (error) {
      setIsLoading(false)
      toast(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.product}>
      <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label>Product name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            required
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product image:</label>
          <Card cardClass={styles.group}>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Uploaded ${uploadProgress}%`}
              </div>

            </div>
            )}
            <input type='file' accept="image/*" placeholder="Product Image" name="image"  onChange={(e) => handleImageChange(e)}/>
            {product.imageURL === '' ? null : (
              <input type="text" name="imageURL" value={product.imageURL}/>
            )}
            
          </Card>
          <label>Product price:</label>
              <input
                type="number"
                name="price"
                placeholder="Product name"
                required
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />

          <label>Product category:</label>
          <select required name="category" value={product.category} onChange={(e) => handleInputChange(e)}>
            <option value="" disabled>-- choose category</option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                </option>
              )
            })}
          </select>

          <label>Product Company Brand:</label>
          <input
            type="text"
            name="brand"
            placeholder="Product brand"
            required
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

        <label>Product Description:</label>
        <textarea required name="desc" value={product.desc} cols='30' rows='10'  onChange={(e) => handleInputChange(e)}></textarea>
        <button className="--btn --btn-primary">{detectForm(id, 'Save Product', 'Edit Product')}</button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddProducts;
