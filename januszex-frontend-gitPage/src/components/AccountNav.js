import React from "react";
import { Link, Form } from "react-router-dom";
import classes from "./AccountNav.module.css";


export default function AccountNav({ reserv }) {
    return (
        <div className={classes.navContainer}>
            <ul>
                <li><Link className={classes.myAccount} to="/account">Moje konto</Link></li>
                <li><Link to="/account/reservationsHistory">Historia rezerwacji</Link></li>
                <li><Link to="/account/loyalityCard">Karta lojalnościowa</Link></li>
                <li><Link to="/account/changePersInfo">Zmień dane</Link></li>
                <li><Form action="/logout" method="post">
                    <button>Wyloguj się</button>
                </Form></li>
            </ul>
        </div>
    );
}
