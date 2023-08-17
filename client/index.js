const path = require('path')
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store/store';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';

const stripePromise = await loadStripe('pk_test_51Nb4nULGhuSP9aYSAxdf6aQbhLrOH4mUrCUQjZClEcp3toVctTQ3wWlJXhaQTyo9o5GEzpW9KruAqIN3uuXln1qh00jWT6a5hC'); 

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </Router>
);
