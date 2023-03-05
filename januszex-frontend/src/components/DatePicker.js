import React, { useRef, useState } from 'react';
import classes from './DatePicker.module.css';

function DatePicker(props) {

    const current = new Date();
    function addZero(numb) {
        return (numb < 10) ? '0' : ''
    }
    const currDate = current.getFullYear() + '-' + addZero(current.getMonth() + 1) + (current.getMonth() + 1) + '-' + addZero(current.getDate()) + (current.getDate());
    console.log(currDate);
    const [startDate, setStartDate] = useState('');
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const handleStartChange = (e) => {
        setStartDate(e.target.value);
        const tmpDates = {
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value
        };
        props.onDatePicker(tmpDates);
    };

    const handleEndChange = (e) => {
        const tmpDates = {
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value
        };
        props.onDatePicker(tmpDates);
    };

    return (
        <div className={classes.datePicker}>
            <h2>Wybierz daty rezerwacji</h2>
            <div className={classes.dates}>
                <div className={classes.picker}>
                    <label htmlFor="from">Rezerwacja od:</label>
                    <input type="date" id="from" name="from" min={currDate} onChange={handleStartChange} ref={startDateRef} required />
                </div>
                <div className={classes.picker}>
                    <label htmlFor="to">Rezerwacja do:</label>
                    <input type="date" id="to" name="to" min={startDate} onChange={handleEndChange} ref={endDateRef} required />
                </div>
            </div>
        </div>
    );

}

export default DatePicker;