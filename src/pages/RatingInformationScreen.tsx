import React, { useState } from "react";

type Address = {
    line_1: string;
    line_2: string | null;
    city: string;
    region: string;
    postal: string;
};
type Quote = {
    first_name: string;
    last_name: string;
    address: Address;
};
const defaultAddress: Address = {
    line_1: '',
    line_2: null,
    city: '',
    region: '',
    postal: '',
};
const defaultQuote: Quote = {
    first_name: '',
    last_name: '',
    address: defaultAddress,
}

function RatingInformationScreen() {
    const [values, setValues] = React.useState<Quote>(defaultQuote);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert('A form was submitted: ' + JSON.stringify(values));

        fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(values)
        })
        .then(function(response) {
        console.log(response)
        return response.json();
      })
      .catch(err => {
        //   Handle the error, if any
        console.log(err)
      });

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