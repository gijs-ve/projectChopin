import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/user';

function SignOutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logOut());
        navigate('/');
    }, []);

    return <div>You succesfully signed out!</div>;
}

export { SignOutPage };
