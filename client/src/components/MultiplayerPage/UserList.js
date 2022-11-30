import { useSelector } from 'react-redux';
import { selectRoom } from '../../store/multiplayer';

const UserList = () => {
    const room = useSelector(selectRoom());
    const User = (i) => {
        {
            return (
                <>
                    <div
                        className={`border-2 rounded-xl border-stone-800 ${
                            i.name === room.hostName
                                ? 'bg-yellow-700'
                                : 'bg-gray-700'
                        } h-1/2 my-auto flex flex-row`}
                    >
                        <div
                            className="border-2 rounded-xl border-stone-800  w-4 h-4"
                            style={{
                                backgroundColor: i.color,
                            }}
                        ></div>
                        <h1
                            className={`px-2 text-white self-center text-base font-medium text-sm`}
                        >
                            {i.name}
                        </h1>
                    </div>
                </>
            );
        }
    };
    const Users = room.users.map((i) => {
        return (
            <div className={`pl-4 flex flex-wrap`} key={i.name}>
                <User name={i.name} color={i.color} />
            </div>
        );
    });
    return Users;
};

export { UserList };
