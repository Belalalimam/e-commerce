import axios from "axios";
import React from "react";
import "./AddUser.css";

export default function AddUser() {
  const [data, setData] = React.useState({
    productName: "",
    productTitle: "",
    productImage: "",
    productCategory: "",
    productCategorySize: "",
    productColor: "",
    productDescription: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      const res = await axios.post(
        "http://localhost:3000/Products/addProduct",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (res.data) {
        alert("Product added successfully!");
        setData({
          productName: "",
          productTitle: "",
          productImage: "",
          productCategory: "",
          productCategorySize: "",
          productColor: "",
          productDescription: "",
        });
      }
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text"
            className="form-control"
            placeholder="Enter product name"
            onChange={(e) => setData({ ...data, productName: e.target.value })}
            value={data.productName}
          />
        </div>

        <div className="form-group">
          <label>Product Title</label>
          <input 
            type="text"
            className="form-control"
            placeholder="Enter product title"
            onChange={(e) => setData({ ...data, productTitle: e.target.value })}
            value={data.productTitle}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            className="form-control"
            onChange={(e) => setData({ ...data, productCategory: e.target.value })}
            value={data.productCategory}
          >
            <option value="">Select Category</option>
            <option value="lace">lace</option>
            <option value="fabric">fabric</option>
            <option value="etylo">etylo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Size</label>
          <select 
            className="form-control"
            onChange={(e) => setData({ ...data, productCategorySize: e.target.value })}
            value={data.productCategorySize}
          >
            <option value="">Select Size</option>
            <option value="xs">xs</option>
            <option value="s">s</option>
            <option value="m">m</option>
          </select>
        </div>

        <div className="form-group">
          <label>Color</label>
          <select 
            className="form-control"
            onChange={(e) => setData({ ...data, productColor: e.target.value })}
            value={data.productColor}
          >
            <option value="">Select Color</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            className="form-control"
            rows="4"
            placeholder="Product description"
            onChange={(e) => setData({ ...data, productDescription: e.target.value })}
            value={data.productDescription}
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input 
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setData({ ...data, productImage: e.target.files[0] })}
            
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}
