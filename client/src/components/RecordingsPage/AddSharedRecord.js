import { cnButton, whiteLabel } from '../classNames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSharedKey } from '../../store';

const AddSharedRecord = () => {
    const [sharedKeyInput, setSharedKeyInput] = useState('');
    const dispatch = useDispatch();
    return (
        <>
            <h1 className={whiteLabel + ' ml-4'}>Add record</h1>
            <input
                placeholder="Record Key"
                className="ml-4"
                value={sharedKeyInput}
                onChange={(e) => setSharedKeyInput(e.target.value)}
            />
            <button
                className={cnButton}
                onClick={() => dispatch(addSharedKey(sharedKeyInput))}
            >
                Add
            </button>
        </>
    );
};
export { AddSharedRecord };
