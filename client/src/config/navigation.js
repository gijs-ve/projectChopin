import {
    WrenchIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    RadioIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: 'home', icon: HomeIcon, current: true },
    { name: 'Solo', href: 'solo', icon: UserIcon, current: false },
    {
        name: 'Multiplayer',
        href: 'multiplayer',
        icon: UsersIcon,
        current: false,
    },
    { name: 'Recordings', href: '#', icon: RadioIcon, current: false },
    { name: 'Settings', href: '#', icon: WrenchIcon, current: false },
];
const userNavigation = [{ name: 'Sign out', href: 'signout' }];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export { navigation, userNavigation, classNames };
