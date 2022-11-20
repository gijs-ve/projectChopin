import Example from './Example';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Example />
            </Provider>
        </Router>
    );
}

export default App;
