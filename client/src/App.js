import MainPage from './pages/MainPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <MainPage />
            </Provider>
        </Router>
    );
}

export default App;
