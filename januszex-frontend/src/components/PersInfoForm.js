import React, { useRef, useState } from "react";
import { json, Form, useActionData } from "react-router-dom"
import classes from "./PersInfoForm.module.css";

function PresInfoPanel({ user, method }) {
  const data = useActionData();

  return (
    <div className={classes.panelContainer}>
      <Form method={method} className={classes.form}>
        <div className={classes.formElements}>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input type="text" name="username" defaultValue={user.username} id="username" required></input>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" defaultValue={user.email} id="email" required></input>
          <label htmlFor="name">Imię:</label>
          <input type="text" name="name" defaultValue={user.name} id="name" required></input>
          <label htmlFor="surname">Nazwisko:</label>
          <input type="text" name="surname" defaultValue={user.surname} id="surname" required></input>
          <label htmlFor="drivingLicense">Numer prawo jazdy:</label>
          <input type="text" name="drivingLicense" defaultValue={user.drivLic} id="drivingLicense" required></input>
          <label htmlFor="licCategoryNumber">Kategoria prawo jazdy:</label>
          <input type="text" name="licCategoryNumber" defaultValue={user.licCateg} id="licCategoryNumber" required></input>
          <label htmlFor="password">Hasło:</label>
          <input type='password' name="password" id="password" required></input>
        </div>
        <div className={(data && data.error) ? classes.errorContainer : classes.errorContainerInvisible}>{data && data.error && <div className={classes.error}>{data.error}</div>}</div>
        <div className={classes.btnContainer}><button className={classes.btnSubmit}>Zmień dane</button></div>
      </Form>
    </div>
  );
}

export default PresInfoPanel;
