import classes from "./DamagesPage.module.css";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function DamagesPage() {
    const navigate = useNavigate();
    const reserveIDRef = useRef('');
    const damageRef = useRef('');

    async function submitHandler(e) {
        e.preventDefault();
        const tmpData = {
            description: damageRef.current.value
        }

        const response = await fetch('/report_damage', {
            method: 'POST',
            body: JSON.stringify(tmpData),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        navigate("/");
    }

    return (
        <div className={classes.parentCss}>
            <div className={classes.bodyCss}>
                <p className={classes.titleCommunicatsCss}>Zgłoś usterkę</p>
                <form onSubmit={submitHandler}>
                    <label className={classes.communicatsCss} htmlFor="reserveID">Numer rezerwacji</label>
                    <br></br>
                    <br></br>
                    <input className={classes.reservationNumberCss} id="reserveID" type="text" placeholder="Pole dla numeru rezerwacji" name="reserveID" ref={reserveIDRef} required />
                    <br></br>
                    <br></br>
                    <label className={classes.communicatsCss} htmlFor="damage-msg">Proszę opisać usterkę</label>
                    <br></br>
                    <br></br>
                    <textarea className={classes.damagemsgCss} placeholder="Pole do opisu usterki" rows="10" ref={damageRef} required></textarea>
                    <br></br>
                    <br></br>
                    <button className={classes.buttonCss}>Wyślij</button>
                </form>
            </div>
        </div>
    );
}

export default DamagesPage;