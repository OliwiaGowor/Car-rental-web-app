import React from "react";
import { useSearchParams, json, redirect } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import classes from "./SignPage.module.css";

export default function SignPage() {

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <div className={classes.signPage}>
      <SignUpForm method="POST" />
    </div>
  );
}

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();

  const authData = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    login: data.get("username"),
    password: data.get("password"),
    drivingLicense: data.get("driv-lic-numb"),
    licCategoryNumber: data.get("lic-categ"),
    role: 1
  };

  const response = await fetch("https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 400) {
    alert('Coś poszło nie tak. Spróbuj ponownie.');
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  localStorage.setItem("isLogged", true);
  return redirect("/Car-rental-web-app");
}