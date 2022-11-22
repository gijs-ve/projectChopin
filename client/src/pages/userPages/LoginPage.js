import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, selectToken } from '../../store/user';

export const LoginPage = (p) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(selectToken);
    const { signUpActive, setSignUpActive } = p.signUp;

    useEffect(() => {
        if (token !== null) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login(name, password));
    };

    return (
        <div>
            <div>
                <h1>Login</h1>
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
                    <button type="submit">Login</button>
                </form>
                <div onClick={() => setSignUpActive(!signUpActive)}>
                    <h2>Don't have an account yet? Click here to sign up</h2>
                </div>
            </div>
        </div>
    );
};