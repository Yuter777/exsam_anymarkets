import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import add from "../assets/store.svg";
import list from "../assets/Settings.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img className="first-logo" src={logo} alt="site-logo" />
        </Link>
        <div className="header-navbar">
          <NavLink to="/list">
            <div className="header-navbar-img">
              <img title="Lists" src={list} alt="site-lists" />
            </div>
          </NavLink>
          <NavLink to="/add">
            <div className="header-navbar-img">
              <img title="Lists" src={add} alt="site-add" />
            </div>
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
