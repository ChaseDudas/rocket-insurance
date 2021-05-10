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
        <div className="container">
        <div className="left">
            <div className="header buffer">
                <h2 className="animation a1">Choose Your Comprehensive Coverage Option</h2>
            </div>
            <form className="form">
                <div className="header animation a2">
                    <h3>{quote?.variable_options.deductible.title}</h3>
                    <h4>{quote?.variable_options.deductible.description}</h4>
                    <select name="deductible" onChange={handleChange} className="form-field animation a3">
                        {quote.variable_options.deductible.values.map((deductibleItem) => (
                            <option key={deductibleItem} value={deductibleItem}>$ {deductibleItem}</option>
                        ))}
                    </select>
                </div>
                <div className="header animation a4">
                    <h3>{quote?.variable_options.asteroid_collision.title}</h3>
                    <h4>{quote?.variable_options.asteroid_collision.description}</h4>
                    <select name="asteroid_collision" onChange={handleChange} className="form-field animation a5">
                        {quote.variable_options.asteroid_collision.values.map((asteroid_collisionItem) => (
                            <option key={asteroid_collisionItem} value={asteroid_collisionItem}>$ {asteroid_collisionItem}</option>
                        ))}
                    </select>
                </div>
                <div className="header">
                    <h4 className="animation a6">Fly through space worry-free for</h4>
                    <h1 className="animation a7"><sup>$</sup>{quote?.premium}</h1>
                </div>
                <p className="animation a8"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' rel="noreferrer">Need Help?</a></p>
            </form>
        </div>
        <div className="right"></div>
    </div>  
    );
}

export default QuoteOverviewScreen;