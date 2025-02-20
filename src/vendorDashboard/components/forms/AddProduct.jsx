import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ClipLoader } from "react-spinners";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value === 'true');
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');
      if (!loginToken || !firmId) throw new Error("User not authenticated");

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      formData.append('image', image);
      category.forEach((value) => formData.append('category', value));

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add Product');

      alert("Product added successfully");
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setImage(null);
      setDescription("");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading ? (
        <div className="loaderSection">
          <ClipLoader color="#4fa94d" loading={loading} size={50} />
          <p>Please wait, your product is being added...</p>
        </div>
      ) : (
        <form className="tableForm" onSubmit={handleAddProduct}>
          <h3>Add Product</h3>
          <label>Product Name</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <label>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Category</label>
          <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} /> Veg
          <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} /> Non-Veg

          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Product Image</label>
          <input type="file" onChange={handleImageUpload} />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
