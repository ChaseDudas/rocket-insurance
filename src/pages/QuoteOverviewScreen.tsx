import React, { useEffect, useState } from "react";
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
type updateQuote = {
    quoteId: string,
    rating_address: ratingAddress,
    policy_holder: policyHolder,
    variable_selections: variableSelection,
};
type Quote = {
    quoteId: string,
    rating_address: ratingAddress,
    policy_holder: policyHolder,
    variable_options: variableOption,
    variable_selections: variableSelection,
    premium: string;
};

function QuoteOverviewScreen() {
    const history = useHistory();
    const [quote, setQuote] = useState<Quote>(history.location.state as Quote);
    const [update, setUpdate] = useState<updateQuote>({quoteId:quote.quoteId, rating_address:quote.rating_address, policy_holder:quote.policy_holder, variable_selections:quote.variable_selections})

    console.log("Quote:")
    console.log(quote)
    console.log("Update:")
    console.log(update)

    useEffect(() => {
        fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes/'+ update.quoteId, {
            method: 'PUT',
            body: JSON.stringify({quote: update})
            })
        .then((response) => response.json())
        .then(data => setQuote(data.quote as Quote))
        .catch(err => console.error(err));
    }, [update])

    const handleChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setUpdate({...update, variable_selections: {...update?.variable_selections, [name]: Number(value)}})
    }
    return (    
        <form>
            <div>
                <label>
                    {quote?.variable_options.deductible.title}
                    <small>{quote?.variable_options.deductible.description}</small>
                    <select name="deductible" onChange={handleChange}>
                        {quote.variable_options.deductible.values.map((deductibleItem) => (
                            <option key={deductibleItem} value={deductibleItem}>{deductibleItem}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    {quote?.variable_options.asteroid_collision.title}
                    <small>{quote?.variable_options.asteroid_collision.description}</small>
                    <select name="asteroid_collision" onChange={handleChange}>
                        {quote.variable_options.asteroid_collision.values.map((asteroid_collisionItem) => (
                            <option key={asteroid_collisionItem} value={asteroid_collisionItem}>{asteroid_collisionItem}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <h1>Your premium is {quote?.premium}</h1>
            </div>
        </form>
    );
}

export default QuoteOverviewScreen;