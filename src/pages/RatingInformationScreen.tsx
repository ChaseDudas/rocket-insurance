import React, { useState } from "react";
import { useHistory } from "react-router-dom";

type ratingAddress = {
    line_1: string;
    line_2: string | null;
    city: string;
    region: string;
    postal: string;
};
type policyHolder = {
    first_name: string,
    last_name: string
};
type Option = {
    title: string,
    description: string,
    values: Array<number>
};
type variableOption = {
    deductible: Option,
    asteroid_collision: Option
};
type variableSelection = {
    deductible: number,
    asteroid_collision: number
};
type initQuote = {
    first_name: string;
    last_name: string;
    address: ratingAddress;
};
type Quote = {
    quoteId: string,
    rating_address: ratingAddress,
    policy_holder: policyHolder,
    variable_options: variableOption,
    variable_selections: variableSelection,
    premium: string;
};
const defaultAddress: ratingAddress = {
    line_1: '',
    line_2: null,
    city: '',
    region: '',
    postal: '',
};
const defaultQuote: initQuote = {
    first_name: '',
    last_name: '',
    address: defaultAddress,
}

function RatingInformationScreen() {
    const [values, setValues] = useState<initQuote>(defaultQuote);
    let history = useHistory();

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setValues({...values, [name]: value})
    }

    const handleAddressChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setValues({...values, address: {...values.address, [name]: value}})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes', {
            method: 'POST',
            body: JSON.stringify(values)
            })
        const json = await res.json()
        const quote = json.quote as Quote
        history.push('/overview', quote)
    }

    return (
    <div className="container">
        <div className="left">
            <div className="header">
                <h2 className="animation a1">Welcome to Rocket Insurance</h2>
                <h4 className="animation a2">You're just a few clicks away from flying through space worry-free protected by our comprehensive coverage options.</h4>
            </div>
            <form className="form" method="POST" onSubmit={handleSubmit}>
                <input required type="text" className="form-field animation a3" placeholder="First Name" value={values.first_name} name="first_name" onChange={handleChange} />
                <input required type="text" className="form-field animation a4" placeholder="Last Name" value={values.last_name} name="last_name" onChange={handleChange} />
                <input required type="text" className="form-field animation a5" placeholder="Address Line 1" value={values.address.line_1} name="line_1" onChange={handleAddressChange} />
                <input type="text" className="form-field animation a4" placeholder="Address Line 2" value={values.address.line_2 || ''} name="line_2" onChange={handleAddressChange} />
                <input required type="text" className="form-field animation a6" placeholder="City" value={values.address.city} name="city" onChange={handleAddressChange} />
                <input required type="text" className="form-field animation a7" placeholder="State/Province" value={values.address.region} name="region" onChange={handleAddressChange} />
                <input required type="text" className="form-field animation a8" placeholder="Zip/Postal Code" value={values.address.postal} name="postal" onChange={handleAddressChange} />
                <p className="animation a9"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' rel="noreferrer">Need Help?</a></p>
                <button type='submit' className="animation a10">GET MY QUOTE</button>
            </form>
        </div>
        <div className="right"></div>
    </div>

    );
  }
  
  export default RatingInformationScreen;