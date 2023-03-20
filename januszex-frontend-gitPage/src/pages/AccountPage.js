import React, { useState, useEffect, useCallback } from "react";
import { redirect, json, useSubmit } from "react-router-dom";
import PersInfoPanel from "../components/PersInfoPanel";
import AccountNav from "../components/AccountNav";
import classes from "./AccountPage.module.css"

function AccountPage() {
  const token = localStorage.getItem('isLogged');
  const submit = useSubmit();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/profile');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setUser(data);

    } catch (error) {
      setError("Something went wrong, try again.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler]);

  function startDeleteHandler() {
    const proceed = window.confirm('Czy jesteś pewny?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <div className={classes.accountContainer}>
      <AccountNav />
      <div className={classes.mainElem}>
        <h1>Moje konto</h1>
        <PersInfoPanel user={user} />
        <button className={classes.btnSubmit} onClick={startDeleteHandler}>Usuń konto</button>
      </div>
    </div>
  );
}

export default AccountPage;

export async function action({ params, request }) {
  const userId = params.id;

  const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete user.' },
      {
        status: 500,
      }
    );
  }

  if (response.status === 422 || response.status === 400) {
    return response;
  }

  localStorage.removeItem('ifLogged');
  alert('Usunięto konto');

  return redirect('/Car-rental-web-app');
}
