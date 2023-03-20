import React, { createContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import { useSearchParams, json, redirect } from "react-router-dom";
import classes from "./SignPage.module.css";

function LoginPage() {
    return (
        <div className={classes.signPage}>
            <LoginForm method="POST" />
        </div>
    );
}

export default LoginPage;

//for Github Pages validation is handled on Front-end side
const validateLogin = (authData, users) => {
    const ifOk = users.map ((user) => {
        if (user.login === authData.login) {
            
            if (user.password === authData.password) {
                // Valid password
                localStorage.setItem('userID', user.id);
                return true;
            } else {
                return false;
            }
        } else {
            // Username not found
            return false;
        }
    });
    return ifOk;
};

export async function action({ request }) {
    const method = request.method;
    const data = await request.formData();
    const transformedUsers = [];

    //get users from database - needed to authenticate user
    const responseAuth = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users.json');
    if (!responseAuth.ok) {
        throw new Error('Something went wrong!');
    } else {
        const dataAuth = await responseAuth.json();

        Object.keys(dataAuth).forEach((key) => {
            transformedUsers.push({
                id: [key],
                login: dataAuth[key].login,
                password: dataAuth[key].password,
            })
        });
    }

    //send autentication info to server - not needed if authentication is on front-end
    const authData = {
        login: data.get('username'),
        password: data.get('password')
    };

    /*const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
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
    }*/

    validateLogin(authData, transformedUsers) ? localStorage.setItem('ifLogged', true) : alert('Nieprawidłowy login lub hasło.');
    console.log(validateLogin(authData, transformedUsers));

    return redirect('/Car-rental-web-app');
}