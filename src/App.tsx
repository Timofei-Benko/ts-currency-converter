import { useEffect, useState } from 'react';
import moment from 'moment';

import './App.css';

import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";

const URL:string = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

function App(): JSX.Element {

    type currType = {
        Cur_Abbreviation: string,
        Cur_OfficialRate: number,
        Cur_Scale: number,
    }

    let [currencyData, setCurrencyData] = useState <any>([]);
    let [toCurrency, setToCurrency] = useState <string>('USD');
    let [amount, setAmount] = useState <any>('');
    let [convertedAmount, setConvertedAmount] = useState <number>(0);

    useEffect(() => {

        if (localStorage.getItem('currency')) {
            const currentDate = new Date(Date.now())

            if (!moment().isBefore(currentDate, 'day')) {
                return
            }
        }

        fetch(URL)
            .then(response => response.json())
            .then(data => localStorage.setItem('currency', JSON.stringify(data)))
    }, []);

    function getDataFromLS() {
        let data: Array<currType>;

        if (JSON.parse(typeof localStorage.getItem('currency')) !== null) {
            let dataString: string | null = localStorage.getItem('currency')

            if (typeof dataString === "string") {
                data = JSON.parse(dataString)
                return data
            }
        }
    }

    function filterData(data: Array<currType>) {
        let filteredData: Array<currType> = [];

        for (let curr of data) {

            if (curr.Cur_Abbreviation === 'USD'
                ||
                curr.Cur_Abbreviation === 'EUR'
                ||
                curr.Cur_Abbreviation === 'RUB') {

                let { Cur_Abbreviation, Cur_OfficialRate, Cur_Scale }: currType = curr

                filteredData.push(
                    {
                        Cur_Abbreviation,
                        Cur_OfficialRate,
                        Cur_Scale,
                    }
                )
            }
        }

        // TODO: ask about why the below commented code doesn't work

        // data.forEach((curr: currType) => {
        //
        //     if (curr.Cur_Abbreviation === 'USD'
        //         ||
        //         curr.Cur_Abbreviation === 'EUR'
        //         ||
        //         curr.Cur_Abbreviation === 'RUB') {
        //
        //         let { Cur_Abbreviation, Cur_OfficialRate, Cur_Scale }: currType = curr
        //
        //         filteredData.push(
        //             {
        //                 Cur_Abbreviation,
        //                 Cur_OfficialRate,
        //                 Cur_Scale,
        //             }
        //         )
        //     }
        // })
        return filteredData
    }

    useEffect(() => {
        let data = getDataFromLS()

        if (data) {
            setCurrencyData(filterData(data))
        }
    }, [])

    const handleCurrencyChange = (val: string) => {
        setToCurrency(val)
        setAmount('')
        setConvertedAmount(0)
    }

    function convert(amountToConvert = amount) {
        let curr = currencyData.find((curr: currType) => curr.Cur_Abbreviation === toCurrency)
        const convertedAmount = (amountToConvert * curr.Cur_Scale / curr.Cur_OfficialRate).toFixed(2)
        setConvertedAmount(+convertedAmount)
    }

    return (
        <div className="wrap">
            <h1 style={{color: '#877e87'}}>Currency Converter</h1>
            <div className="App">
                <InputBox
                    currencyData={ currencyData }
                    amount={amount}
                    setAmount={setAmount}
                    handleCurrencyChange={ handleCurrencyChange }
                    convert={ convert }
                    length={0}
                />
                <OutputBox
                    convertedAmount={ convertedAmount }
                    toCurrency={ toCurrency }
                />
            </div>
        </div>
    );
}

export default App;
