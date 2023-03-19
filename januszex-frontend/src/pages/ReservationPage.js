import React, { useRef, useState } from "react";
import DatePicker from "../components/DatePicker";
import { useLocation, useRouteLoaderData, useNavigate } from 'react-router-dom'
import CarCardReserv from "../components/CarCardReserv";
import classes from "./ReservationPage.module.css";

function ReservationPage(props) {

    const token = localStorage.getItem("ifLogged");
    const location = useLocation();
    const navigate = useNavigate();

    const [reservData, setReservData] = useState('');
    const [carData, setCarData] = useState(location.state?.car ?? {});
    const [dates, setDates] = useState('');
    const [data, setData] = useState();

    const nameRef = useRef('');
    const surnameRef = useRef('');
    const emailRef = useRef('');
    const drivLicNumbRef = useRef('');
    const licCategNumbRef = useRef('');
    const collectAddressRef = useRef('');

    function datePickerHandler(dates) {
        setDates(dates);
        const resData = {
            rentDate: dates.startDate + "T00:00:00",
            returnDate: dates.endDate + "T00:00:00",
            deliveryAddress: collectAddressRef.current.value,
            carID: carData.id
        }
        setReservData(resData);
    }

    async function submitHandler(e) {
        e.preventDefault();
        const persInfo = {
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            drivingLicense: drivLicNumbRef.current.value,
            licCategoryNumber: licCategNumbRef.current.value,
            role: 1
        }
        const all = {
            user: persInfo,
            reserve: reservData
        }

        const response = await fetch('/reserve', {
            method: 'POST',
            body: JSON.stringify(!token ? all : reservData),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();

        if (response.status === 422 || response.status === 400) {
            setData(response);
            alert('Coś poszło nie tak');
            return
        }

        navigate("/payment", { state: { numbOfDays: (Date.parse(dates.endDate.slice(8, 10)) - parseInt(dates.startDate.slice(8, 10))), price: carData.price } });
    }

    return (
        <div className={classes.reservationPage}>
            <div className={classes.container}>
                <CarCardReserv car={carData} showButton={location.state?.showButton ?? false} />
                <form className={classes.resForm} onSubmit={submitHandler}>
                    <h1 className={classes.header}>Rezerwacja</h1>
                    <span className={classes.line}></span>
                    <DatePicker onDatePicker={datePickerHandler} />
                    {!token &&
                        <div className={classes.piForm} >
                            <span className={classes.line}></span>
                            <h2>Dane osobiste</h2>
                            <div className={classes.required}>
                                <h3>Pełne imię</h3>
                                <div className={classes.formElem}>
                                    <label htmlFor="name">Imie</label>
                                    <label htmlFor="surname">Nazwisko</label>
                                    <input type="text" placeholder="Wpisz imię" name="name" ref={nameRef} required />
                                    <input type="text" placeholder="Wpisz nazwisko" name="surname" ref={surnameRef} required />
                                </div>

                                <div className={classes.formElem}>
                                    <label htmlFor="email">E-mail</label>
                                    <span></span>
                                    <input type="email" placeholder="Wpisz adres e-mail" name="email" ref={emailRef} required />
                                </div>

                                <h3>Prawo jazdy</h3>
                                <div className={classes.formElem}>
                                    <label htmlFor="driv-lic-numb">Numer prawa jazdy</label>
                                    <label htmlFor="lic-categ">Kategoria prawa jazdy</label>
                                    <input type="text" placeholder="Wpisz numer prawa jazdy" name="driv-lic-numb" ref={drivLicNumbRef} required />
                                    <input type="text" placeholder="Wpisz kategorię" name="lic-categ" ref={licCategNumbRef} required />
                                </div>
                            </div>
                        </div>
                    }
                    <span className={classes.line}></span>
                    <h2>Dodatkowe informacje</h2>
                    <label htmlFor="collect-address">Adres odbioru</label>
                    <textarea className="collect-address" placeholder="Wpisz tutaj adres" rows="3" ref={collectAddressRef} required></textarea>
                    <label htmlFor="comments">Uwagi do rezerwacji</label>
                    <textarea className="comments" placeholder="Wpisz uwagi" rows="5"></textarea>
                    <span className={classes.line}></span>
                    <div className={(data && data.error) ? classes.errorContainer : classes.errorContainerInvisible}>{data && data.error && <div className={classes.error}>{data.error}</div>}</div>
                    <div className={classes.btnContainer}>
                        <button type="submit" className={classes.reservBtn}>Zarezerwuj</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReservationPage;


