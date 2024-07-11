import "./ListProducts.css";

import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IconContext } from "react-icons";

import Loader from "../components/Loader";
import axios from "axios";
import Error from "../components/Error";
import { Link, useNavigate } from "react-router-dom";

const ListProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);

  const [filteredTodos, setFilteredTodos] = useState([]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = await res.data;
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchTodos = (e) => {
    const text = e.target.value;
    const newTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredTodos(newTodos);
  };

  const handleDelete = (id) => {
    if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
      deleteTodo(id);
      location.reload();
    }
    setAddModal(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const navigate = useNavigate();

  const placeOrder = () => {
    navigate("/add", { replace: true });
  };
  const handleEdit = (todo) => {
    setTodoEditing(todo);
  };

  return (
    <div className="page1">
      <div className="title-name1">
        <h2 className="product">Товары</h2>
        <p className="cite">Главная / Товары</p>
      </div>
      <div className="pages">
        <div className="box">
          {error && <Error error={error} />}
          <div className="list-head">
            <p className="list-title">Все товары ({todos.length})</p>
            <input
              type="search"
              placeholder="Поиск"
              className="list-search"
              onChange={searchTodos}
            />
          </div>{" "}
          {loading && <Loader />}
          {filteredTodos.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th>Артикул</th>
                  <th>Бренд</th>
                  <th>Цена</th>
                  <th>Цена со скидкой</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos?.map((todo, i) => (
                  <tr key={todo.id}>
                    <td>{todo.name}</td>
                    <td>{todo.code}</td>
                    <td>{todo.brand}</td>
                    <td>{todo.price}</td>
                    <td>{todo.priceInSale}</td>
                    <td>
                      <Link to={`/edit/${todo.id}`}>
                        <button
                          className="button-editdelete"
                          // onClick={() => handleEdit()}
                        >
                          <IconContext.Provider
                            value={{
                              color: "blue",
                              className: "global-class-name",
                              size: "2em",
                            }}
                          >
                            <FaEdit />
                          </IconContext.Provider>
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="button-editdelete"
                      >
                        <IconContext.Provider
                          value={{
                            color: "blue",
                            className: "global-class-name",
                            size: "2em",
                          }}
                        >
                          <MdDeleteOutline />
                        </IconContext.Provider>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button onClick={placeOrder} className="button-add">
          + Новый товар
        </button>
        <p className="footer_title">© Anymarket 2022</p>
      </div>
    </div>
  );
};

export default ListProducts;
