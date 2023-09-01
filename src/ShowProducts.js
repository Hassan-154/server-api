import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    barcode: '',
    weight: '',
    height: '',
    length: '',
    quantityAvailable: '',
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://patenticdev-4c6b386d6eb6.herokuapp.com/api/product')

      .then(response => response.json())
  .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (Object.values(newProduct).some(value => value === '')) {
      toast.error('please fill all the boxes.');
      return;
    }
    fetch('https://patenticdev-4c6b386d6eb6.herokuapp.com/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(newlyAddedProduct => {
        setProducts(prevProducts => [...prevProducts, newlyAddedProduct]);
        setNewProduct({


          name: '',
          category: '',
          price: '',
          barcode: '',
          weight: '',
          height: '',
          length: '',
          quantityAvailable: '',
        });

        toast.success('Product added successfully!');
      })


      .catch(error => {
        console.error('Error adding new product:', error);
        toast.error('Error adding new product. Please try again later.');
      });
  };
  const handleDelete = productId => {
    fetch(`https://patenticdev-4c6b386d6eb6.herokuapp.com/api/product/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
          toast.success('Product deleted successfully!');
        } else {
toast.error('Error deleting product. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        toast.error('Error deleting product. Please try again later.');
      });
  };

  const [editMode, setEditMode] = useState({});
  const handleEdit = productId => {
    setEditMode({ ...editMode, [productId]: true });
  };
  const handleSave = (productId, updatedProduct) => {
    if (Object.values(updatedProduct).some(value => value === '')) {

      toast.error('Please fill all the boxes before updating.');
      return;
    }
    fetch(`https://patenticdev-4c6b386d6eb6.herokuapp.com/api/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          setEditMode({ ...editMode, [productId]: false });
          const updatedProducts = products.map(product =>
            product.id === productId ? updatedProduct : product
          );
          setProducts(updatedProducts);
          setNewProduct({
            name: '',
            category: '',
            price: '',
            barcode: '',
            weight: '',
            height: '',
            length: '',
            quantityAvailable: '',
          });
  
          toast.success('Product updated successfully!');
        } else {
          toast.error('Error updating product. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        toast.error('Error updating product. Please try again later.');
      });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
      {Object.values(editMode).some(value => value === true) ? 'Edit Data' : 'Product List'}
    </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          placeholder="Enter product category"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Enter product price"
        />
        <input
          type="text"
          name="barcode"
          value={newProduct.barcode}
          onChange={handleInputChange}
          placeholder="Enter product barcode"
        />
        <input
          type="text"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
          placeholder="Enter product weight"
        />
        <input
          type="text"
          name="height"
          value={newProduct.height}
          onChange={handleInputChange}
          placeholder="Enter product height"
        />
        <input
          type="text"
          name="length"
          value={newProduct.length}
          onChange={handleInputChange}
          placeholder="Enter product length"
        />
        <input
          type="text"
          name="quantityAvailable"
          value={newProduct.quantityAvailable}
          onChange={handleInputChange}
          placeholder="Enter quantity available"
        />
        {Object.values(editMode).some(value => value === true) ? (
        <button type="submit" style={{ display: 'none' }}>Add Product</button>
      ) : (
        <button type="submit">Add Product</button>
      )}
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-screen -mt-28">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">
      </div>
    </div>
      ) : (
        <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Barcode</th>
            <th className="py-2 px-4 text-left">Weight</th>
            <th className="py-2 px-4 text-left">Height</th>
            <th className="py-2 px-4 text-left">Length</th>
            <th className="py-2 px-4 text-left">Quantity Available</th>
            <th className="py-2 px-4 text-left">Delete</th>
            <th className="py-2 px-4 text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{product.barcode}</td>
              <td className="py-2 px-4">{product.weight}</td>
              <td className="py-2 px-4">{product.height}</td>
              <td className="py-2 px-4">{product.length}</td>
              <td className="py-2 px-4">{product.quantityAvailable}</td>
              <td><button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
              <td>
                  {editMode[product.id] ? (
                    <button onClick={() => handleSave(product.id, newProduct)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(product.id)}>Edit</button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default ShowProducts;
