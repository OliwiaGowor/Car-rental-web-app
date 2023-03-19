import React from "react";
import classes from "./ThankYouPage.module.css";

export default function ThankYouPage() {
    return (
        <div className={classes.thankYouPage}>
            <div className={classes.container}>
                <h1>Dziękujemy za rezerwację!</h1>
                <p>Potwierdzenie oraz szczególy rezerwacji zostały wysłane na Twój e-mail. Rezerwację możesz także sprawdzić w zkałdace "Historia rezerwacji" na swoim koncie. </p>
            </div>
        </div>
    );
}