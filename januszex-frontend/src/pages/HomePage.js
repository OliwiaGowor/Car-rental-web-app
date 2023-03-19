import React, { useState, useEffect, useCallback } from "react";
import classes from "./HomePage.module.css";
import CarCard from "../components/CarCard"
import Filters from "../components/Filters"

function HomePage() {

    const [filters, setFilters] = useState(false);

    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState(cars);
    const fetchReservationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/list_cars');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const loadedCars = [];

            for (const key in data) {
                loadedCars.push({
                    id: parseInt(data[key].id),
                    howManySeats: data[key].howManySeats,
                    color: data[key].color,
                    distanceCovered: data[key].distanceCovered,
                    comfortScale: data[key].comfortScale,
                    brand: data[key].brand,
                    model: data[key].model,
                    price: data[key].price,
                    isATruck: data[key].isATruck,
                    photoURL: data[key].pictureURL,
                });
            }
            setCars(loadedCars);

        } catch (error) {
            setError("Something went wrong, try again.");
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        fetchReservationsHandler();
    }, [fetchReservationsHandler]);




    const filterChanged = (filters) => {
        setItems(prev => {

            if (filters.textBrand !== "---") {
                prev = prev.filter((option) => option.brand === filters.textBrand)
            }
            if (filters.textModel !== "---") {
                prev = prev.filter((option) => option.model === filters.textModel)
            }
            if (filters.textComfort !== "---") {
                prev = prev.filter((option) => option.comfortScale === filters.textComfort)
            }
            if (filters.textColor !== "---") {
                prev = prev.filter((option) => option.color === filters.textColor)
            }
            if (filters.textSeats !== "---") {
                prev = prev.filter((option) => option.howManySeats == filters.textSeats)
            }
            if (filters.textTransporter !== "---") {
                if (filters.textTransporter === "Yes") {
                    prev = prev.filter((option) => option.isATruck === true)
                }
                else {
                    prev = prev.filter((option) => option.isATruck === false)
                }
            }
            if (filters.textMin !== null && filters.textMin !== "") {
                prev = prev.filter((option) => option.price > filters.textMin)
            }
            if (filters.textMax !== null && filters.textMax !== "") {
                prev = prev.filter((option) => option.price < filters.textMax)
            }

            return prev
        }

        )
    }

    const boolChange = (bool) => {
        setItems(cars)
        setFilters(prev => {
            return bool
        })
    }

    return (
        <div className={classes.homePage}>
            <div className={classes.container}>
                <div className={classes.filters}>
                    <Filters options={cars} onFilterChange={filterChanged} onBoolChange={boolChange} />
                </div>
                <div className={classes.cardsContainer}>
                    {
                        (filters == true) ? (items.map((opt, id) => { return (<CarCard key={id} car={opt} showButton={true} />) })) : (cars.map((opt, id) => { return (<CarCard key={id} car={opt} showButton={true} />) }))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;
