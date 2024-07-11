import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewProduct.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceInSale, setPriceInSale] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = await res.data;
      setTodos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createTodo = async (todo) => {
    try {
      await axios.post("http://localhost:3000/products", todo);
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!name, !brand, !code, !price, !description)) {
      alert("заполните ячейки заголовка!!!");
      return;
    }
    const newTodo = {
      id: String(todos.length + 1),
      name,
      brand,
      code,
      price,
      priceInSale,
      description,
    };

    console.log("Submitting:", newTodo);
    createTodo(newTodo);
    navigate("/list", { replace: true });
  };

  return (
    <>
      <div className="page">
        <div className="title-name">
          <h2>Новый товар</h2>
          <p>Главная / Новый товар</p>
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
                      <label htmlFor="code">Артикул производителя *</label>
                      <input
                        type="number"
                        id="article"
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
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="discounted-price">Цена со скидкой</label>
                      <input
                        type="number"
                        id="discounted-price"
                        value={priceInSale}
                        required
                        onChange={(e) => setPriceInSale(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="footer_box">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="button-save"
                    >
                      Сохранить
                    </button>
                    <button
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

export default NewProduct;
