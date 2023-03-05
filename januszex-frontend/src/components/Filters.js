import classes from "./Filters.module.css";

const BrandFilter = ({ car }) => {
    return (
        <option className={classes.option}>{car.brand}</option>

    )
}
const ModelFilter = ({ car }) => {
    return (
        <option className={classes.option}>{car.model}</option>

    )
}
const ComfortFilter = ({ car }) => {
    return (
        <option className={classes.option}>{car.comfortScale}</option>

    )
}
const ColorFilter = ({ car }) => {
    return (
        <option className={classes.option}>{car.color}</option>

    )
}
const SeatsFilter = ({ car }) => {
    return (
        <option className={classes.option}>{car.howManySeats}</option>

    )
}

function GetFilters(filterChange, boolChange) {
    var selectedBrand = document.getElementById("brandSelect");
    var textBrand = selectedBrand.options[selectedBrand.selectedIndex].text;
    var selectedModel = document.getElementById("modelSelect");
    var textModel = selectedModel.options[selectedModel.selectedIndex].text;
    var selectedComfort = document.getElementById("comfortSelect");
    var textComfort = selectedComfort.options[selectedComfort.selectedIndex].text;
    var selectedColor = document.getElementById("colorSelect");
    var textColor = selectedColor.options[selectedColor.selectedIndex].text;
    var selectedSeats = document.getElementById("seatsSelect");
    var textSeats = selectedSeats.options[selectedSeats.selectedIndex].text;
    var selectedTransporter = document.getElementById("transporterSelect");
    var textTransporter = selectedTransporter.options[selectedTransporter.selectedIndex].text;
    var selectedMin = document.getElementById("min");
    var textMin = selectedMin.value;
    var selectedMax = document.getElementById("max");
    var textMax = selectedMax.value;

    const filters = {
        textBrand,
        textModel,
        textComfort,
        textColor,
        textSeats,
        textTransporter,
        textMin,
        textMax
    }

    boolChange(true);
    filterChange(filters);
}

function ResetFilters(boolChange) {
    document.getElementById("brandSelect").selectedIndex = 0;
    document.getElementById("modelSelect").selectedIndex = 0;
    document.getElementById("comfortSelect").selectedIndex = 0;
    document.getElementById("colorSelect").selectedIndex = 0;
    document.getElementById("seatsSelect").selectedIndex = 0;
    document.getElementById("transporterSelect").selectedIndex = 0;
    document.getElementById("min").value = null;
    document.getElementById("max").value = null;
    boolChange(false);
}

function Filters({ options, onFilterChange, onBoolChange }) {
    const brandOptions = [...new Map(options.map(option => [option["brand"], option])).values()];
    const modelOptions = [...new Map(options.map(option => [option["model"], option])).values()];
    const comfortOptions = [...new Map(options.map(option => [option["comfortScale"], option])).values()];
    const colorOptions = [...new Map(options.map(option => [option["color"], option])).values()];
    const seatsOptions = [...new Map(options.map(option => [option["howManySeats"], option])).values()];
    return (
        <div className={classes.filterCont}>
            <div className={classes.filtersTitle}>Filtry:</div>
            <div className={classes.carParameters}>
                <span className={classes.line}></span>
                <div className={classes.parametersTitle}>Parametry auta</div>
                <div className={classes.filtersData}>Marka:</div>
                <select className={classes.select} id="brandSelect">
                    <option className="checkBoxesCss">---</option>
                    {
                        brandOptions.map((opt, id) => { return (<BrandFilter key={id} car={opt} />) })
                    }
                </select>
                <div className={classes.filtersData}>Model:</div>
                <select className={classes.select} id="modelSelect">
                    <option>---</option>
                    {
                        modelOptions.map((opt, id) => { return (<ModelFilter key={id} car={opt} />) })
                    }
                </select>
                <div className={classes.filtersData}>Komfort:</div>
                <select className={classes.select} id="comfortSelect">
                    <option>---</option>
                    {
                        comfortOptions.map((opt, id) => { return (<ComfortFilter key={id} car={opt} />) })
                    }
                </select>
                <div className={classes.filtersData}>Kolor:</div>
                <select className={classes.select} id="colorSelect">
                    <option>---</option>
                    {
                        colorOptions.map((opt, id) => { return (<ColorFilter key={id} car={opt} />) })
                    }
                </select>
                <div className={classes.filtersData}>Ilość miejsc:</div>
                <select className={classes.select} id="seatsSelect">
                    <option>---</option>
                    {
                        seatsOptions.map((opt, id) => { return (<SeatsFilter key={id} car={opt} />) })
                    }
                </select>
                <div className={classes.filtersData}>Kategoria C:</div>
                <select className={classes.select} id="transporterSelect">
                    <option>---</option>
                    <option>Tak</option>
                    <option>Nie</option>
                </select>
            </div>
            <div className={classes.pricesFilter}>
                <span className={classes.line}></span>
                <div className={classes.priceTitle}>Cena</div>
                <div className={classes.singeRange}>
                    <span className={classes.minMaxText}>Min:</span>
                    <input className={classes.minInputCss} type="number" id="min" />
                </div>
                <div className={classes.singeRange}>
                    <span className={classes.minMaxText}>Maks:</span>
                    <input className={classes.maxInputCss} type="number" id="max" />
                </div>
            </div>
            <span className={classes.line}></span>
            <div className={classes.buttons}>
                <button className={classes.filterButton} type="button" onClick={() => GetFilters(onFilterChange, onBoolChange)}>Filtruj</button>
                <button className={classes.filterButton} type="button" onClick={() => ResetFilters(onBoolChange)}>Wyczyść</button>
            </div>
        </div>
    )
}

export default Filters