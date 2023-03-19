import React, { useState, useEffect, useCallback } from "react";
import AccountNav from "../components/AccountNav";
import classes from "./LoyalityCardPage.module.css"

function LoyalityCard() {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchCardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/https://januszex-68c45-default-rtdb.europe-west1.firebasedatabase.app/');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setCardData(data);

        } catch (error) {
            setError("Something went wrong, try again.");
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        fetchCardData();
    }, [fetchCardData]);


    return (
        <div className={classes.accountContainer}>
            <AccountNav />
            <div className={classes.mainElem}>
                <h1>Karta lojalnościowa</h1>
                <div >
                    <ul>
                        <li>Liczba rezerwacji: {cardData.orders}</li>
                        <li>Liczba punktów: {cardData.points}</li>
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default LoyalityCard;
