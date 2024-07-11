import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ListProducts from "./pages/ListProducts";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<ListProducts />} />
        <Route path="/add" element={<NewProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
