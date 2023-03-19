import React from "react";
import LoginForm from "../components/LoginForm";
import { useSearchParams, json, redirect } from "react-router-dom";
import classes from "./SignPage.module.css";

function LoginPage() {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    return (
        <div className={classes.signPage}>
            <LoginForm method="POST" />
        </div>
    );
}

export default LoginPage;

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';
    const method = request.method;
    let error = {};
    const data = await request.formData();

    const authData = {
        login: data.get('username'),
        password: data.get('password')
    };

    const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 400) {
        alert('Coś poszło nie tak');
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Something went wrong.' }, { status: 500 });
    }

    localStorage.setItem('ifLogged', true);
    return redirect('/');
}