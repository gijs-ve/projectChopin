import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/solo')
    }, [])
    return <div></div>;
}
export { HomePage };
