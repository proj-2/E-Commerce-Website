# E-Commerce-Website
A full stack E-commerce application

## Contibutors:

- [Charanvir Singh](https://github.com/charanvir)
- [Yuri Ichikawa](https://github.com/yuri92)
- [Michael Guida](https://github.com/pot-of-coffee)
- [Brennan Merrett](https://github.com/BrennanJLM)
- [Ferozuddin Zargar](https://github.com/FalconView)

#

## Table of Contents

- [Links](#links)
- [Description](#description)
- [Project Overview](#project-overview)

#

## Links

- Deployed application: 
- Github repository: [https://github.com/proj-2/E-Commerce-Website](https://github.com/proj-2/E-Commerce-Website)
- Presentation - [https://prezi.com/view/CzreEgGWKMht88IZr6bg/]

## Description / Function

Wearther shows users current weather and a 5-day weather forecast via images of appropriate clothing for said weather. Wearther prompts the user for their name, age, gender, clothing size, and city of interest, and provides:

- Current weather & forecast for current day in 3-hr increments, explained visually with appropriate clothing images.
- 5-day forecast with visual clothing suggestions based on daily average temperature.
- Amazon links to appropriate clothing given today's weather
- The ability to "favourite" amazon items (which saves to local storage) and allow users to visit a favourites pages with a list of all the items they saved.

APIs used include:

- [weatherapi](https://www.weatherapi.com/weather/), for the current and hourly weather data
- [openweatherapi](https://openweathermap.org/), for the five-day forecast data
- [Stripe API](https://dashboard.stripe.com/test/dashboard), 

## Project Overview

### User Story

AS a USER
I WANT to create an account
SO THAT I can interact with the marketplace

AS a PURCHASER
I WANT to view products on sale
SO THAT I can purchase items for my developer needs

AS a SELLER
I WANT to post listings for my product(s)
SO THAT I can sell them to other developers

AS a SELLER
I WANT to verify the integrity of my product(s)/account
SO THAT users can trust what they’re buying


### Acceptance Criteria

ACCEPTANCE TEST FOR USER STORY
 
GIVEN a set of links in a navigation bar
WHEN I click on a link
THEN I should go to the appropriate web page that is described by the link.

GIVEN an account system
WHEN I sign-up with credentials
THEN they are saved into the database
When I visit the site at a later time
Then I can log in using my credentials

GIVEN a marketplace
WHEN I list a product
THEN users can purchase it
WHEN I see a listing
THEN I can add it to cart
WHEN I view cart
THEN I can check-out and process the order

GIVEN a verification system
WHEN I submit a verification form
THEN I can be given a verification status

