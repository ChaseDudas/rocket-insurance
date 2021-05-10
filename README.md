# Sure Frontend Technical Challenge

# **Rocket Insurance**

### By **Chase Dudas**

[chasedudas13@gmail.com](mailto:chasedudas13@gmail.com)    [Portfolio](https://www.cdudas.com/)    [LinkedIn](https://www.linkedin.com/in/chasedudas/)    [GitHub](https://github.com/ChaseDudas)

# Installation Instructions

1. Navigate to [repo](https://github.com/ChaseDudas/sure-take-home.git)
2. Clone locally using `gh repo clone ChaseDudas/sure-take-home`
3. Install dependencies using `yarn install`
4. Run the app in the development mode using `yarn start`
5. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.
6. Voila!

# Discussion

I used the following technologies: **HTML**, **SASS**, **React**, **Jest**, and **Enzyme**.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`yarn create react-app sure-take-home --template typescript`

I am hosting a live version of the repo on AWS Amplify.

# Requirements

> Build a React application with the following two screens:
1. Rating Information

I added a screen with a form to collect the user's rating information. The `GET MY QUOTE` button submits the information to the `/api/v1/quotes` endpoint to create a quote. Using `react-router-dom`, the app then navigates to the Quote Overview screen, passing on the response from the POST request.

> 2. Quote Overview

Having successfully created a quote with the customer's rating information, the Quote Overview screen shows the annual premium for the policy and the available coverage limits. It showcases a form with a `<select>` dropdown for each of the policy coverage variables that let's the user select a preferred option for each variable. If either of these values change, a PUT request is made to the following endpoint `api/v1/quotes/:quoteId`. The premium is then updated accordingly.

> A link to a live, running example of your project.

I am hosting the project using `AWS Amplify`. Visit [`https://www.rocketinsurance.app/`](https://www.rocketinsurance.app/) to experience the live project for yourself.
