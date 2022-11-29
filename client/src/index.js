import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { socket, SocketContext } from './components/MultiplayerPage/socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <SocketContext.Provider value={socket}>
                <App />
            </SocketContext.Provider>
        </Provider>
    </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
