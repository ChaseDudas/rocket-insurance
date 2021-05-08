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
    deductable: number,
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

function QuoteOverviewScreen() {
    const history = useHistory();
    const quote = history.location.state as Quote

    // let quote = history.location.state;
    console.log(quote?.premium)
    
    return (    
        <form>
            <div>
                <label>
                    {quote?.variable_options.deductible.title}
                    <small>{quote?.variable_options.deductible.description}</small>
                    <select>
                        <option value={quote?.variable_options.deductible.values[0]}>{quote?.variable_options.deductible.values[0]}</option>
                        <option value={quote?.variable_options.deductible.values[1]}>{quote?.variable_options.deductible.values[1]}</option>
                        <option value={quote?.variable_options.deductible.values[2]}>{quote?.variable_options.deductible.values[2]}</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    {quote?.variable_options.asteroid_collision.title}
                    <small>{quote?.variable_options.asteroid_collision.description}</small>
                    <select>
                        <option value={quote?.variable_options.asteroid_collision.values[0]}>{quote?.variable_options.asteroid_collision.values[0]}</option>
                        <option value={quote?.variable_options.asteroid_collision.values[1]}>{quote?.variable_options.asteroid_collision.values[1]}</option>
                        <option value={quote?.variable_options.asteroid_collision.values[2]}>{quote?.variable_options.asteroid_collision.values[2]}</option>
                        <option value={quote?.variable_options.asteroid_collision.values[3]}>{quote?.variable_options.asteroid_collision.values[3]}</option>
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