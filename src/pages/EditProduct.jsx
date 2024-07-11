import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./NewProduct.css";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0); // Assuming price is a number
  const [priceInSale, setPriceInSale] = useState(0); // Assuming priceInSale is a number
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        const data = await res.data;
        setName(data.name);
        setBrand(data.brand);
        setCode(data.code);
        setDescription(data.description);
        setPrice(data.price || 0);
        setPriceInSale(data.priceInSale || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (product) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      navigate("/list", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !brand || !code || !price || !description) {
      alert("Please fill in all required fields!");
      return;
    }

    const updatedProduct = {
      name,
      brand,
      code,
      description,
      price,
      priceInSale,
    };

    updateProduct(updatedProduct);
  };

  return (
    <>
      <div className="page">
        <div className="title-name">
          <h2>Изменить товар</h2>
          <p>Главная / Изменить товар / {id}</p>
        </div>
        <div className="pages">
          <div className="box-menu">
            <div className="product-about">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-section">
                    <h2 className="box-name">Основные</h2>
                    <div className="form-group">
                      <label htmlFor="name">Название *</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="brand">Бренд *</label>
                      <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="code">Артикул производителя *</label>
                      <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Описание *</label>
                      <textarea
                        id="description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="form-group">
                      <label htmlFor="price">Цена</label>
                      <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="priceInSale">Цена со скидкой</label>
                      <input
                        type="number"
                        id="priceInSale"
                        value={priceInSale}
                        onChange={(e) => setPriceInSale(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="footer_box">
                    <button type="submit" className="button-save">
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="button-cancel"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
