import { RecordEntry } from '.';

function RecordList(p) {
    const { records, label, selfName } = p;
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
                                                        Rename
                                                    </span>
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
                                                Delete
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {records.map((i) => {
                                        return (
                                            <RecordEntry
                                                key={i.id}
                                                i={i}
                                                selfName={selfName}
                                                showPublish={showPublish}
                                            />
                                        );
                                    })}
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
