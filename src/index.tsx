import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from './context/AppContext';
// import  MapWrapper  from './components/MapWrapper';

// const DriversApp = GoogleMapWrapper(App);
// const DriversApp=MapWrapper(App);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( <AppContextProvider>
 <App />
</AppContextProvider>);

