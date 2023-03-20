import React from "react";
import { useActionData, useNavigation, Form, Link } from 'react-router-dom';
import classes from "./LoginForm.module.css";
function LoginForm({ method }) {

  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={classes.loginForm}>
      <Form method={method}>
        <h1>Zaloguj się</h1>
        <div className={classes.loginFormContainer}>
          <label htmlFor="userName">Nazwa użytkownika</label>
          <input type="text" placeholder="Wpisz login" name="username" required />
          <label htmlFor="password">Hasło</label>
          <input type="password" placeholder="Wpisz hasło" name="password" required />
        </div>
        <div className={(data && data.error) ? classes.errorContainer : classes.errorContainerInvisible}>
          {data && data.error &&
            <div className={classes.error}>{data.error}</div>}
        </div>
        <div className={classes.btnContainer}>
          <button className={classes.btnSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Logowanie..." : "Zaloguj się"}
          </button>
        </div>
        <div className={classes.btnContainer}><Link to={'/Car-rental-web-app/sign'}>Nie masz jeszcze konta? Kliknij tu i zarejestruj się!</Link></div>
      </Form>
    </div>
  );
}

export default LoginForm;

