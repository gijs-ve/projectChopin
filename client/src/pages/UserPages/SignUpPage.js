import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, selectToken } from '../../store/user';
import { cnButton, whiteLabel } from '../../components/classNames';

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
        <div className="flex flex-col flex-wrap border-4 rounded-xl border-gray-300 content-center text-center border-2 bg-gray-400 my-[10%] mx-[25%]">
            <form onSubmit={submitForm}>
                <div>
                    <h1 className={whiteLabel + ' pl-24'}>Name</h1>
                    <input
                        className="h-[10%] w-[55%] py-[2%] pl-4"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className={whiteLabel + ' pl-24'}>Password</h1>
                    <input
                        className="h-[10%] w-[55%]"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" className={cnButton}>
                    Sign Up
                </button>

                <div
                    onClick={() => setSignUpActive(!signUpActive)}
                    className={whiteLabel + ' hover:cursor-pointer py-12'}
                >
                    <h2>Already have an account yet? Click here to login</h2>
                </div>
            </form>
        </div>
    );
};
