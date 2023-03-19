import classes from "./CarCardReserv.module.css";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";



const CarCard = ({ car, showButton }) => {
    const navigate = useNavigate();
    const { isButton, setIsButton } = useState(true);

    function clickHandler() {
        navigate("/reservation", { state: { showButton: false, car: car } });
    }

    return (
        <div className={classes.cardContainer} >
            <div className={classes.card}>
                <img src={car.photoURL} className={classes.image} />
                <div className={classes.info}>
                    <div className={classes.data}>
                        <div className={classes.brandAndName}>{car.brand + " " + car.model}</div>
                        <div>{"Liczba miejsc: " + car.howManySeats}</div>
                        <div>{"Kolor: " + car.color}</div>
                        <div>{"Komfort: " + car.comfortScale}</div>
                        <div>{"Przebieg: " + car.distanceCovered}</div>
                        <div>{"Dostawczy: " + (car.isATruck ? "Tak" : "Nie")}</div>
                        <div className={classes.price}>Cena: <span className={classes.priceNumb}>{car.price} zł</span></div>
                    </div>
                    {showButton &&
                        <div className={classes.buttonContainer}>
                            <button onClick={clickHandler} className={classes.button}>
                                {"Zarezerwuj"}
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>)
}

export default CarCard;