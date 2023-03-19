import React from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import classes from "./PaymentPage.module.css";

function PaymentPage() {
    const location = useLocation();

    return (
        <div className={classes.paymentPage}>
            <h1>Do zapłaty: {location.state.numbOfDays * location.state.price}</h1>
            <PaymentForm />
        </div>
    );
}

export default PaymentPage;