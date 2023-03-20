import React from "react";
import classes from "./Navbar.module.css";
import { Link, Form } from "react-router-dom";
import accountIcon from "../icons/account-icon.png";
import logo from "../icons/logo.png";


function PageNav() {
  const token = localStorage.getItem('ifLogged');

  return (
    <div className={classes.pageNav}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/Car-rental-web-app">
          <img className={classes.logoImg} src={logo} width="90px" height="65px" />
          <div className={classes.compName}>Januszex</div>
        </Link>

        <ul className={classes.middle}>
          <li><Link to="/Car-rental-web-app">Przeglądaj auta</Link></li>
          <li><Link to="/damages">Zgłoś usterkę</Link></li>
          <li><Link to="/aboutUs">O nas</Link></li>
        </ul>
        <div className={classes.rightIcons}>
          <ul>
            {!token && (
              <div className={classes.notLogged}>
                <li>
                  <Link to="/login">
                    <img className="account-icon" src={accountIcon} width="25px" height="25px" />
                  </Link>
                </li>
                <li><Link className={classes.signUp} to="/sign">Zarejestruj się</Link></li>
              </div>
            )}
            {token && (
              <div className={classes.account}>
                <li><Link to="/account"><img className="account-icon" src={accountIcon} width="25px" height="25px" /></Link></li>
                <li>
                  <Form action="/logout" method="post">
                    <button>Wyloguj się</button>
                  </Form>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageNav;
