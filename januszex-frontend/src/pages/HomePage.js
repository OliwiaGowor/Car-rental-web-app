import React, { useState, useEffect, useCallback } from "react";
import { redirect, json, useRouteLoaderData, defer, useSubmit, Await } from "react-router-dom";
import classes from "./HomePage.module.css";
import CarCard from "../components/CarCard"
import Filters from "../components/Filters"
import { getAuthToken } from '../util/auth';

const options = [
    {
        howManySeats: 5,
        color: "cherry",
        distanceCovered: 5000,
        comfortScale: 'H',
        brand: "Mercedes",
        model: "Supreme",
        price: 999,
        isATruck: false,
        photoURL: "https://www.spa4car.pl/files/realizacje/mercedes_560sec/74956E60-77C6-4F09-92C0-C9D76C2770B5.jpeg",
    },
    {
        howManySeats: 6,
        color: "redZone",
        distanceCovered: 300000,
        comfortScale: 'M',
        brand: "kałdi",
        model: "aBieda",
        price: 299,
        isATruck: false,
        photoURL: "https://bidfax.info/uploads/posts/2019-06/25/audi-s3-premium-2015-waubfgff3f1079708-img1.jpg",
    },
    {
        howManySeats: 5,
        color: "pearl White",
        distanceCovered: 10000,
        comfortScale: 'L',
        brand: "Wolsvagen",
        model: "T5",
        price: 800,
        isATruck: true,
        photoURL: "https://otoklasyki.pl/Upload/posters/volkswagen-t3-westfalia-161575376680.jpeg",
    }, {
        howManySeats: 4,
        color: "green",
        distanceCovered: 2137000,
        comfortScale: 'E',
        brand: "Fiat",
        model: "125p",
        price: 420,
        isATruck: false,
        photoURL: "https://i.pinimg.com/564x/78/00/0d/78000d694214eb174fe3de5994ec6259.jpg",
    }, {
        howManySeats: 5,
        color: "grey",
        distanceCovered: -80085,
        comfortScale: 'H',
        brand: "Fiat",
        model: "multipla",
        price: 18,
        isATruck: false,
        photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Fiat_Multipla_front_20080825.jpg/1200px-Fiat_Multipla_front_20080825.jpg",
    }, {
        howManySeats: 1,
        color: "black",
        distanceCovered: 200000,
        comfortScale: 'M',
        brand: "Batman sp. z o. o.",
        model: "Batmobil",
        price: 999999,
        isATruck: false,
        photoURL: "https://i.iplsc.com/batmobil-wystawiony-na-sprzedaz/00032QW20JRA3MVI-C122-F4.jpg",
    },
]



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
                        /* globalVal.filteredOptions.map((opt,id)=>{return (<CarCard key={id} car={opt} showButton={true}/>)})*/
                        (filters == true) ? (items.map((opt, id) => { return (<CarCard key={id} car={opt} showButton={true} />) })) : (cars.map((opt, id) => { return (<CarCard key={id} car={opt} showButton={true} />) }))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;
