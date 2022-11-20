import {
    WrenchIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'Solo', href: '#', icon: UserIcon, current: false },
    { name: 'Multiplayer', href: '#', icon: UsersIcon, current: false },
    { name: 'Settings', href: '#', icon: WrenchIcon, current: false },
];
const userNavigation = [{ name: 'Sign out', href: '#' }];

export { navigation, userNavigation };
