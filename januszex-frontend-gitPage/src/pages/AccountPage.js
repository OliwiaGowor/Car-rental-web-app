import React, { useState } from "react";
import { redirect, json, useSubmit, useRouteLoaderData, defer, Await } from "react-router-dom";
import PersInfoPanel from "../components/PersInfoPanel";
import AccountNav from "../components/AccountNav";
import classes from "./AccountPage.module.css"

function AccountPage() {
  const token = localStorage.getItem('isLogged');
  const submit = useSubmit();
  const { user } = useRouteLoaderData('user-details');

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
        <Await reslove={user}>
          <PersInfoPanel user={user} />
        </Await>
        <button className={classes.btnSubmit} onClick={startDeleteHandler}>Usuń konto</button>
      </div>
    </div>
  );
}

export default AccountPage;

async function loadUserDetails(id) {
  const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch user.' },
      { status: 500 }
    );
  } else {
    const data = await response.json();
    return data;
  }
}

export async function loader({ request, params }) {
  const id = params.userID;
  return defer({
    user: await loadUserDetails(id),
  });
}

export async function action({ params, request }) {
  const id = params.id;

  const response = await fetch('https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json', {
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
