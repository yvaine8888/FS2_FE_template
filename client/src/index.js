import React from 'react';
import { createRoot } from 'react-dom/client';
import "./styling/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById('root');

// Create a root for the application
const root = createRoot(container);

// Render the application using the new root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
