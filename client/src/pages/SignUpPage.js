import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../store/user/thunks';
import { selectToken } from '../store/user/selectors';

export const SignUpPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(selectToken);

    useEffect(() => {
        if (token !== null) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(signUp(name, password));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <form onSubmit={submitForm}>
                    <input
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};
