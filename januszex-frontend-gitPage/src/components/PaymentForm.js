import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PaymentForm.module.css"

function PaymentForm() {
    const navigate = useNavigate();

    function submitHandler() {
        navigate("/Car-rental-web-app/thankYou");
    };

    return (
        <div className={classes.paymentForm}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1 className={classes.header}>Dane do płatności</h1>
                <div className={classes.formContainer}>
                    <div className={classes.formElem}>
                        <label htmlFor="name">Imię</label>
                        <label htmlFor="surname">Nazwisko</label>
                        <input type="text" placeholder="Wpisz imię" name="name" required />
                        <input type="text" placeholder="Wpisz nazwisko" name="surname" required />
                    </div>
                    <div className={classes.formElem}>
                        <label htmlFor="card-numb">Numer karty</label>
                        <label htmlFor="card-date">Data upływu ważności karty</label>
                        <input type="text" placeholder="Wpisz numer karty" name="card-numb" required />
                        <input type="text" placeholder="MM/YY" name="card-date" required />
                    </div>
                    <div className={classes.formElem}>
                        <label htmlFor="sec-numb">Kod CVC</label>
                        <span></span>
                        <input type="text" placeholder="Wpisz CVC" name="sec-numb" required />
                    </div>
                </div>
                <div className={classes.btnContainier}>
                    <button className={classes.button} type="submit">Zapłać</button>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;