import React, { useState, useEffect, useCallback } from "react";
import { json, useSubmit } from "react-router-dom";
import PersInfoForm from "../components/PersInfoForm";
import AccountNav from "../components/AccountNav";
import classes from "./ChangePersInfoPage.module.css"

function ChangePersInfoPage() {

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


  return (
    <div className={classes.accountContainer}>
      <AccountNav />
      <div className={classes.mainElem}>
        <h1>Zmień swoje dane</h1>
        <PersInfoForm user={user} method='PUT' />
      </div>
    </div>
  );
}

export default ChangePersInfoPage;

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const newData = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    login: data.get("username"),
    password: data.get("password"),
    drivingLicense: data.get("drivingLicense"),
    licCategoryNumber: data.get("licCategoryNumber"),
  };

  const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });

  if (response.status === 422 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Something went wrong.' }, { status: 500 });
  }

  alert('Dane zmienione');
  return null;
}