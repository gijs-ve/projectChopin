import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, selectToken } from '../../store/user';

export const SignUpPage = (p) => {
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

                    <div onClick={() => setSignUpActive(!signUpActive)}>
                        <h2>
                            Already have an account yet? Click here to login
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    );
};
