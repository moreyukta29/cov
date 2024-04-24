import { useState, useEffect } from "react";
import axios from "axios";
import DataRectangle from "./Data";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const HistoricalData = () => {
    const [country, setCountry] = useState(null);
    const [selecteCountry, setSelectCountry] = useState('');
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://restcountries.com/v3.1/all`);
                setCountry(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCountry();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${selecteCountry}?lastdays=1500`);
                setHistoricalData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [selecteCountry]);

    const handleCountry = (e) => {
        setSelectCountry(e.target.value);
    };

    console.log('data',historicalData)

    let totalCases = 0;
    let totalRecoveries = 0;
    let totalDeaths = 0;

    if (historicalData && historicalData.timeline) {
        const { timeline } = historicalData;

        Object.values(timeline.cases).forEach((cases) => {
            totalCases += cases;
        });

        Object.values(timeline.recovered).forEach((recovered) => {
            totalRecoveries += recovered;
        });

        Object.values(timeline.deaths).forEach((deaths) => {
            totalDeaths += deaths;
        });
    }

    console.log('cases',totalCases)
    console.log('recoveries',totalRecoveries)
    console.log('deaths',totalDeaths)


    return (
        <div className="container mx-auto py-8 ">
            <h1 className="text-3xl font-bold mb-4">COVID-19 and Population Dashboard</h1>
            <p>Country: {selecteCountry.toUpperCase()}</p> 
            {loading && <p>Loading...</p>}
            <select className="border rounded-lg px-4 py-2 mb-4" value={selecteCountry} onChange={handleCountry}>
                {country && country.map((countries) => (
                    <option key={countries.cca2} value={countries.cca2.toLowerCase()}>
                        {countries.name.common}
                    </option>
                ))}
            </select>

            {selecteCountry && country && country.length > 0 && country.find(c => c.cca2.toLowerCase() === selecteCountry) && (
            <h2 className="text-xl font-semibold mb-2">{country.find(c => c.cca2.toLowerCase() === selecteCountry).name?.common} </h2>
            )}

            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="flex items-center">
                    <DataRectangle label="Total Cases" count={totalCases} color="#9CA8FF" />
                </div>
                <div className="flex items-center">
                    <DataRectangle label="Recoveries" count={totalRecoveries} color="#47D928" />
                </div>
                <div className="flex items-center">
                    <DataRectangle label="Deaths" count={totalDeaths} color="#FF4D57" />
                </div>
            </div>
            
            <div className="flex justify-between  space-x-10">
    <div className="w-1/2">
        {historicalData ? (
            <LineChart data={historicalData} />
        ) : (
            <p>Loading historical data...</p>
        )}
    </div>
        <div className="w-1/4">
            {historicalData ? (
                <PieChart data={historicalData} />
            ) : (
                <p>Loading historical data...</p>
            )}
        </div>
    </div>

        </div>
    );
};

export default HistoricalData;



