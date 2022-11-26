import { getLengthFromRecordStrings } from '../../components/recorder/recorderFunctions';

function RecordList(p) {
    const { records, label } = p;
    let showPublish = false;
    if (label === 'My recordings') showPublish = true;
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className=" -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Length
                                        </th>
                                        {!showPublish ? (
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Recorded by
                                            </th>
                                        ) : (
                                            ''
                                        )}
                                        {showPublish ? (
                                            <>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Share key
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                >
                                                    <span className="sr-only">
                                                        Publish
                                                    </span>
                                                </th>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Listen
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {records.map((i) => (
                                        <tr key={i.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {i.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {getLengthFromRecordStrings(
                                                    i.recordstrings,
                                                )}
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
                                                        {i.uuid}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a
                                                            href="#"
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Publish
                                                            <span className="sr-only">
                                                                , {i.name}
                                                            </span>
                                                        </a>
                                                    </td>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a
                                                    href="#"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Play
                                                    <span className="sr-only">
                                                        , {i.name}
                                                    </span>
                                                </a>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a
                                                    href="#"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                    <span className="sr-only">
                                                        , {i.name}
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { RecordList };
