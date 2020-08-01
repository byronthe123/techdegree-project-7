# Project 7 - React Gallery App

This project is a React single page app that displays photos from the Flickr API. **Aiming for exceeds expectations: all bonus requirements completed.** 


## Programming Approach

React router was used to set up routing for the app and there are 4 routes total. Three of the routes correspond to each of the NavLinks and there is a dynamic search route ```/search/:query``` which will depend on the user's search term. To keep the code as DRY as possible, a single *PhotoContainer.js* component was used to display all the images for all of the routes. While the API fetches new data for a user's query, a loading icon is displayed using an additional NPM package called *react-spinners* (**Bonus 1**). If no match is found for the user's search term, a friendly message is displayed that no results were found (**Bonus 2**).  Using *Switch*, a route to handle non-existing routes was also created which renders the *NotFound* component (**Bonus 3**).

## Syntax and Conventions

The app is written in ES6 JavaScript. 
