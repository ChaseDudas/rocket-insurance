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
    const [values, setValues] = React.useState<initQuote>(defaultQuote);
    const [quote, setQuote] = React.useState<Quote>();
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
        alert('A form was submitted: ' + JSON.stringify(values));

        // fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes', {
        //     method: 'POST',
        //     body: JSON.stringify(values)
        //     })
        // .then((response) => response.json())
        // .then(data => setQuote(data.quote))
        // .catch(err => console.error(err));

        // // console.log(quote)
        // history.push('/overview', quote)

        const res = await fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes', {
            method: 'POST',
            body: JSON.stringify(values)
            })
        const json = await res.json()
        const quote = json.quote as Quote
        // console.log(quoteID)
        history.push('/overview', quote)
    }

    return (
      <form className='rating-information-form' method="POST" onSubmit={handleSubmit}> 
          <div>
              <label>
                  Firstname:
                  <input required type="text" value={values.first_name} name="first_name" onChange={handleChange} />
              </label>
              <label>
                  Lastname:
                  <input required type="text" value={values.last_name} name="last_name" onChange={handleChange} />
              </label>
          </div>
          <div>
              <label>
                  Address:
                  <input required type="text" name="line_1" value={values.address.line_1} onChange={handleAddressChange} />
                  <input type="text" name="line_2"  value={values.address.line_2 || ''} onChange={handleAddressChange} />
                  <input required type="text" name="city" value={values.address.city} onChange={handleAddressChange} />
                  <input required type="text" name="region" value={values.address.region} onChange={handleAddressChange} />
                  <input required type="text" name="postal" value={values.address.postal} onChange={handleAddressChange} />
              </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
      </form>
    );
  }
  
  export default RatingInformationScreen;