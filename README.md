# Crop Guardian

Crop Guardian is the weather application for farmers. Tailored to suit essential agricultural needs, it delivers reliable weather data for anywhere in the world. With intuitive features such as real time recommendations specific to their location, farmers can make informed decisions around planting, harvesting and other critical farming activities. Whether it's monitoring precipitation levels, wind speeds, humidity, or temperature fluctuations, our app equips farmers with the necessary tools to optimize their workload and manage weather risks effectively. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites
 
Before you begin, ensure you have the following installed to run the React code and install the dependencies: 
- [Node.js](https://nodejs.org/en/): JavaScript runtime built on Chrome's V8 JavaScript engine.

### Installing
 
Follow these steps to set up the development environment: 

1. Download the zip folder containing the project files

2. Extract the contents of the zip folder on to a location on your local machine. 

3. Open a terminal or command prompt and navigate to the directory where you extracted the project files. Or open the folder in your chosen IDE and open a new terminal there. 
For example, in Visual Studio Code. 

4. Install the necessary dependencies by running the following command:
```
npm install
```
This project relies on the following dependencies: 
```
"dependencies": {
**@testing-library/jest-dom**: A library for testing React components using jest-dom matchers.
**@testing-library/react**: A library for testing React components.
**@testing-library/user-event**: A library for simulating user events when testing React components.
**axios**: A popular JavaScript library for making HTTP requests from the browser or Node.js.
**react**: A JavaScript library for building user interfaces.
**react-dom**: A package for working with the DOM in React applications.
**react-scripts**: A set of scripts and configuration used by Create React App.
**web-vitals**: A library for measuring all the Web Vitals metrics on your website.
}
```
To use the interactive map, you need to install the Leaflet library by running: 
```
npm install leaflet 
```
To render the hourly forecast chart, you need to install the chart.js library by running: 

```
npm install chart.js
```

## Running the App
Running the following command should open the application in your browser. 
```
npm start
```

## Credits

The application uses the following open source packages:

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Leaflet](https://leafletjs.com/): Open-source JavaScript library for interactive maps.
- [Chart.js](https://www.chartjs.org/): Simple yet flexible JavaScript charting for designers and developers.

Data Sources:

- [OpenWeatherMap API](https://openweathermap.org/api): Provides weather data and forecasts for locations worldwide.
- [OpenStreetMap](https://www.openstreetmap.org/): Collaborative mapping project. Interactive map. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`



### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
