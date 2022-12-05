import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectToken } from '../../store/user';
import { cnButton, whiteLabel } from '../../components/classNames';

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
                    Login
                </button>

                <div
                    onClick={() => setSignUpActive(!signUpActive)}
                    className={whiteLabel + ' hover:cursor-pointer py-12'}
                >
                    <h2>Don't have an account yet? Click here to sign up.</h2>
                </div>
            </form>
        </div>
    );
};

let state = [
    {
        tournamentId: 0,
        hostId: 13133113,
        playerCount: 16,
        games: [
            {
                gameId: 0,
                ballPosition: { x: 0, y: 5 },
                players: [
                    { playerId: 13133113, score: 0 },
                    { playerId: 555, score: 2 },
                ],
            },
            {
                gameId: 1,
                ballPosition: { x: 133, y: 1333 },
                players: [
                    { playerId: 331, score: 3 },
                    { playerId: 65555, score: 2 },
                ],
            },
        ],
    },
    {
        tournamentId: 0,
        hostId: 13133113,
        playerCount: 16,
        games: [
            {
                gameId: 0,
                ballPosition: { x: 0, y: 5 },
                players: [
                    { playerId: 13133113, score: 0 },
                    { playerId: 555, score: 2 },
                ],
            },
            {
                gameId: 1,
                ballPosition: { x: 133, y: 1333 },
                players: [
                    { playerId: 331, score: 3 },
                    { playerId: 65555, score: 2 },
                ],
            },
        ],
    },
];
