import { selectToken } from './store/user/selectors';
import { useSelector } from 'react-redux';
import { MainPage, NoUserPage } from './pages';

function App() {
    const token = useSelector(selectToken);
    return <>{!token ? <NoUserPage /> : <MainPage />}</>;
}

export default App;
