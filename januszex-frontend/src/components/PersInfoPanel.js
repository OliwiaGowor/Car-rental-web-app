import React from "react";
import classes from "./PersInfoPanel.module.css";

function PresInfoPanel({ user }) {
  return (
    <div className={classes.panelContainer}>
      <ul>
        <li className="username">Nazwa użytkownika: {user.username}</li>
        <li className="email">E-mail: {user.email}</li>
        <li className="name">Imię: {user.name}</li>
        <li className="surname">Nazwisko: {user.surname}</li>
        <li className="driving-license">Numer prawa jazdy: {user.drivLic}</li>
        <li className="lic-categ">Kategoria prawa jazdy: {user.licCateg}</li>
      </ul>
    </div>
  );
}

export default PresInfoPanel;