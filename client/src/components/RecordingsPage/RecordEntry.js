import { useState } from 'react';
import {
    deleteRecording,
    updatePublishStatus,
    setActiveRecord,
    startListening,
    clearListening,
    editRecordName,
} from '../../store';
import { getLengthFromRecordStrings } from '../recorder';
import { useDispatch } from 'react-redux';
function RecordEntry(p) {
    const { i, showPublish, selfName } = p;
    const dispatch = useDispatch();
    const selfIsCreator = (creator) => {
        if (selfName === creator) return true;
        return false;
    };
    const [inEdit, setInEdit] = useState(false);
    const [editInput, setEditInput] = useState(i.name);
    const updateRecording = (id) => {
        dispatch(updatePublishStatus(id));
    };

    const removeRecording = (id) => {
        dispatch(deleteRecording(id));
    };

    const playRecording = (id) => {
        dispatch(clearListening());
        dispatch(setActiveRecord(id));
        dispatch(startListening());
    };

    const renameRecording = (id) => {
        if (inEdit) {
            dispatch(editRecordName(id, editInput));
        }
        setInEdit(!inEdit);
    };
    return (
        <tr key={i.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {inEdit ? (
                    <input
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                    />
                ) : (
                    <>{editInput} </>
                )}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {getLengthFromRecordStrings(i.recordstrings)}
            </td>
            {!showPublish ? (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {i.createdBy}
                </td>
            ) : (
                ''
            )}
            {showPublish ? (
                <>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                            id="removeBox"
                            className="outline-0 :focus no-underline"
                            value={i.uuid}
                        />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div onClick={() => renameRecording(i.id)}>
                            {inEdit
                                ? selfIsCreator(i.createdBy)
                                    ? 'Save'
                                    : ''
                                : selfIsCreator(i.createdBy)
                                ? 'Rename'
                                : ''}
                            <span className="sr-only">
                                , Change publish status of
                                {i.name}
                            </span>
                        </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div onClick={() => updateRecording(i.id)}>
                            {i.isPublished
                                ? selfIsCreator(i.createdBy)
                                    ? 'Unpublish'
                                    : ''
                                : selfIsCreator(i.createdBy)
                                ? 'Publish'
                                : ''}
                            <span className="sr-only">
                                , Change publish status of
                                {i.name}
                            </span>
                        </div>
                    </td>
                </>
            ) : (
                ''
            )}
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div onClick={() => playRecording(i.id)}>
                    Play
                    <span className="sr-only">, {i.name}</span>
                </div>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                {showPublish ? (
                    selfIsCreator(i.createdBy) ? (
                        <div onClick={() => removeRecording(i.id)}>
                            Delete
                            <span className="sr-only">Delete</span>
                        </div>
                    ) : (
                        ''
                    )
                ) : (
                    ''
                )}
            </td>
        </tr>
    );
}

export { RecordEntry };
