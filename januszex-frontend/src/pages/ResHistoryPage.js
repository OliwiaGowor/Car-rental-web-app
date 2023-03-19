import React, { useState, useEffect, useCallback } from "react";
import { json, useSubmit } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import classes from "./ResHistoryPage.module.css"

export default function ResHistoryPage() {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReservationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/reservation_history');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const loadedReserv = [];

            for (const key in data) {
                loadedReserv.push({
                    id: data[key].id,
                    rentDate: data[key].rentDate,
                    returnDate: data[key].returnDate,
                    deliveryAddress: data[key].deliveryAddress,
                    valid: data[key].valid,
                    carID: data[key].carID,
                    userID: data[key].userID,
                });
            }

            setReservations(loadedReserv);

        } catch (error) {
            setError("Something went wrong, try again.");
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        fetchReservationsHandler();
    }, [fetchReservationsHandler]);

    const current = new Date();

    function addZero(numb) {
        return (numb < 10) ? '0' : ''
    }
    const currDate = current.getFullYear() + '-' + addZero(current.getMonth() + 1) + (current.getMonth() + 1) + '-' + addZero(current.getDate()) + (current.getDate());

    const submit = useSubmit();

    function startCancelHandler(id) {
        const proceed = window.confirm('Jesteś pewny?');
        if (proceed) {
            localStorage.setItem('resID', id);
            submit(null, { method: 'PUT' });
        }
    }

    return (
        <div className={classes.accountContainer}>
            <AccountNav />
            <div className={classes.mainElem}>
                <h1>Twoje rezerwacje</h1>
                <div >
                    <ul>
                        {reservations.map((res) => (
                            <li key={res.id} className={classes.reservation}>
                                <div className={classes.elem}>Numer rezerwacji: {res.id}</div>
                                <div className={classes.elem}>Data rozpoczęcia wypożyczenia: {res.rentDate}</div>
                                <div className={classes.elem}>Data zakończenia wypożyczenia: {res.returnDate}</div>
                                <div className={classes.elem}>Adres odbioru: {res.deliveryAddress}</div>
                                <div className={classes.elem}>Aktywne: {res.valid ? "Tak" : "Anulowana"}</div>
                                {(res.rentDate > currDate) && res.valid &&
                                    <div className={classes.btnContainer}>
                                        <button className={classes.btnSubmit} onClick={() => startCancelHandler(res.id)}>Anuluj rezerwację</button>
                                    </div>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export async function action({ params, request }) {
    const method = request.method;
    const reservId = localStorage.getItem('resID');
    let error = {};

    const idToSend = {
        id: parseInt(reservId)
    };

    const response = await fetch('/cancel_reservation', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idToSend),
    });

    if (!response.ok) {
        throw json({ message: 'Something went wrong.' }, { status: 500 });
    }

    localStorage.removeItem('resID');
    return null;
}
