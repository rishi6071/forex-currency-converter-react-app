import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const CurrencyRow = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-5">
                    <div className="mb-3">
                        <input type="number" min="0"
                            className="form-control form-control-lg"
                            id={`${props.type}Amount`}
                            name={`${props.type}_amount`}
                            value={props.amount}
                            onChange={props.onAmountChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-7">
                    <select
                        className="form-select form-select-lg"
                        aria-label={`${props.type}_currency`}
                        id={`${props.type}Currency`}
                        name={`${props.type}_currency`}
                        value={props.currency.code}
                        onChange={props.onCurrencyChange}>
                        {
                            props.currencyOptions.map((currency, cid) => {
                                return <option value={currency.code} key={`${props.type}_${cid}`}>{currency.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </>
    );
}

export default CurrencyRow;