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
        <div className="flex flex-col flex-wrap border-4 border-gray-300 content-center text-center border-2 bg-gray-100 my-[10%] mx-[25%]">
            <form onSubmit={submitForm}>
                <div>
                    <h1>Login</h1>

                    <input
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <h1>Password</h1>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
            <div onClick={() => setSignUpActive(!signUpActive)}>
                <h2>Don't have an account yet? Click here to sign up</h2>
            </div>
        </div>
    );
};
