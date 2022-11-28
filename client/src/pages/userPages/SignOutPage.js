import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut, selectToken } from '../../store/user';
import { whiteLabel } from '../../components/classNames';

function SignOutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    useEffect(() => {
        dispatch(logOut());
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [dispatch]);

    return (
        <div>
            <h1 className={whiteLabel}>You have succesfully signed out!</h1>
        </div>
    );
}

export { SignOutPage };
