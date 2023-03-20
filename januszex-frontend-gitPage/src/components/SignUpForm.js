import React from "react";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import classes from "./SignUpForm.module.css"

function SignUpForm({ method }) {
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.signUpForm} >
      <div className={classes.container}>
        <Form method={method}>
          <h1 className={classes.header}>Zarejestruj się</h1>
          <div className={classes.accountInfo}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="Enter E-mail" name="email" required />
            <label htmlFor="username">Nazwa użytkownika</label>
            <input id="username" type="text" placeholder="Enter Username" name="username" required />
            <label htmlFor="password">Hasło</label>
            <input id="password" type="password" placeholder="Enter Password" name="password" required />
          </div>
          <div className={classes.persInfo}>
            <h2>Dane osobiste</h2>
            <span className={classes.line}></span>
            <h3>Pełne imię</h3>
            <div className={classes.formElem}>
              <label htmlFor="name">Imię</label>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" placeholder="Enter Name" name="name" id="name" required />
              <input type="text" placeholder="Enter Surname" name="surname" id="surname" required />
            </div>
            <span className={classes.line}></span>
            <h3>Prawo jazdy</h3>
            <div className={classes.formElem}>
              <label htmlFor="driv-lic-numb">Numer prawa jazdy</label>
              <label htmlFor="lic-categ">Kategoria prawa jazdy</label>
              <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" id="driv-lic-numb" required />
              <input type="text" placeholder="Enter driving license category" name="lic-categ" id="lic-categ" required />
            </div>
          </div>
          <div className={(data && data.error) ? classes.errorContainer : classes.errorContainerInvisible}>{data && data.error && <div className={classes.error}>{data.error}</div>}</div>
          <div className={classes.btnContainer}>
            <button className={classes.btnSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
            </button>
          </div>
          <div className={classes.btnContainer}><Link to={'/Car-rental-web-app/login'}>Masz już konto? Kliknij tu i zaloguj się!</Link></div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;

