import React, { useEffect, useState } from 'react';
import './css/Forex.css';
import CurrencyRow from './CurrencyRow';
import { API_KEY, BASE_URL } from './Data';

import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const Forex = () => {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [time, setTime] = useState(new Date().toUTCString());
    const [amountSourceTargetCurrency, setAmountSourceTargetCurrency] = useState(true);
    const [sourceCurrency, setSourceCurrency] = useState({
        code: 'INR',
        name: 'Indian Rupee'
    });
    const [targetCurrency, setTargetCurrency] = useState({
        code: 'USD',
        name: 'United States Dollar'
    });

    let sourceAmount, targetAmount;
    if (!amountSourceTargetCurrency) {
        targetAmount = amount;
        sourceAmount = (amount / exchangeRate).toFixed(4);
    } else {
        sourceAmount = amount;
        targetAmount = (amount * exchangeRate).toFixed(4);
    }

    // Source & Target Amount Change
    const amountChange = (event) => {
        let type = event.target.id.substring(0, 6);
        if (type === 'source') {
            setAmount(event.target.value);
            setAmountSourceTargetCurrency(true);
        }
        else if (type === 'target') {
            setAmount(event.target.value);
            setAmountSourceTargetCurrency(false);
        }
    }

    // Source & Target Currency Change
    const currencyChange = (event) => {
        // Used to Get Selected Option's Text
        let index = event.nativeEvent.target.selectedIndex;
        let optionText = event.nativeEvent.target[index].text;

        let type = event.target.id.substring(0, 6);
        if (type === 'source') {
            setSourceCurrency({
                code: event.target.value,
                name: optionText
            });
        }
        else if (type === 'target') {
            setTargetCurrency({
                code: event.target.value,
                name: optionText
            });
        }
    }

    // Currency List API CALL
    useEffect(() => {
        async function getCurrencies() {
            let url = `${BASE_URL}/currencies?api_key=${API_KEY}`;
            try {
                let res = await axios.get(url);
                res = res.data.response.fiats;
                const list = [];
                Object.keys(res).forEach(key => list.push({
                    code: key,
                    name: res[key].currency_name
                }));
                setCurrencyOptions(list);
            }
            catch (error) {
                console.log(error);
            }
        }
        getCurrencies();
    }, []);

    // Currency Convert API Call
    useEffect(() => {
        async function getData() {
            let url = `${BASE_URL}/latest?base=${sourceCurrency.code}&symbols=${targetCurrency.code}&api_key=${API_KEY}`;
            try {
                let res = await axios.get(url);
                res = res.data.response;
                setTime(new Date(res.date).toUTCString());
                setExchangeRate(res.rates[targetCurrency.code]);
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [sourceCurrency, targetCurrency]);

    return (
        <>
            <div className="container mt-md-4 mt-3">
                <div className="row px-md-0 px-3">
                    <div className="col-md-6 col-12 offset-md-3" id="forex_box">
                        <div className="row">
                            <p className="source_heading">{'1'} {sourceCurrency.name} Equals</p>
                            <h3 className="target_heading">
                                {(exchangeRate !== undefined) ? exchangeRate.toFixed(5) : NaN} {targetCurrency.name}
                            </h3>
                            <p className="time_heading">{time} · Disclaimer</p>
                        </div>

                        <div className="row mt-sm-4 mt-3 d-flex justify-content-center">
                            {/* Source Currency */}
                            <CurrencyRow type="source"
                                currencyOptions={currencyOptions}
                                amount={sourceAmount}
                                onAmountChange={amountChange}
                                currency={sourceCurrency}
                                onCurrencyChange={currencyChange}
                            />

                            {/* Target Currency */}
                            <CurrencyRow type="target"
                                currencyOptions={currencyOptions}
                                amount={targetAmount}
                                onAmountChange={amountChange}
                                currency={targetCurrency}
                                onCurrencyChange={currencyChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forex;