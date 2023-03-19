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
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";
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

  const response = await fetch("/register", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 400) {
    alert('Samochód jest już zarezerwowany w wybranym terminie.');
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  localStorage.setItem("isLogged", true);
  return redirect("/");
}