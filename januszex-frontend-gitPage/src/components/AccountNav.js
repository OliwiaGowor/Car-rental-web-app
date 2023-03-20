import React from "react";
import { Link, Form } from "react-router-dom";
import classes from "./AccountNav.module.css";


export default function AccountNav({ reserv }) {
    return (
        <div className={classes.navContainer}>
            <ul>
                <li><Link className={classes.myAccount} to="/Car-rental-web-app/:userID/account">Moje konto</Link></li>
                <li><Link to="/Car-rental-web-app/account/:userID/reservationsHistory">Historia rezerwacji</Link></li>
                <li><Link to="/Car-rental-web-app/account/:userID/loyalityCard">Karta lojalnościowa</Link></li>
                <li><Link to="/Car-rental-web-app/account/:userID/changePersInfo">Zmień dane</Link></li>
                <li><Form action="/Car-rental-web-app/logout" method="post">
                    <button>Wyloguj się</button>
                </Form></li>
            </ul>
        </div>
    );
}
