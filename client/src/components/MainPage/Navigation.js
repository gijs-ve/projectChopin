import React from 'react';
import { navigation, classNames } from '../../config/navigation';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigation, selectNavigation } from '../../store/appState';
import { clearDisplayer, clearListening } from '../../store';

function NavigationSmall() {
    const dispatch = useDispatch();
    return (
        <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((i) => (
                <Link
                    key={i.name}
                    to={i.href}
                    onClick={() => {
                        dispatch(setNavigation(i.name));
                        dispatch(clearDisplayer());
                    }}
                    className={classNames(
                        i.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                >
                    <i.icon
                        className={classNames(
                            i.current
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                    />
                    {i.name}
                </Link>
            ))}
        </nav>
    );
}

function NavigationBig() {
    const dispatch = useDispatch();
    const navigationCurrent = useSelector(selectNavigation());
    const currentPage = navigationCurrent.find((i) => {
        if (!i.current) return false;
        return true;
    });
    const navigationRendered = navigation.map((i) => {
        if (i.name === currentPage.name) return { ...i, current: true };
        return { ...i, current: false };
    });
    return (
        <nav className="space-y-1 px-2">
            {navigationRendered.map((i) => (
                <Link
                    key={i.name}
                    to={i.href}
                    onClick={() => {
                        dispatch(setNavigation(i.name));
                        dispatch(clearDisplayer());
                        dispatch(clearListening());
                    }}
                    className={classNames(
                        i.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    )}
                >
                    <i.icon
                        className={classNames(
                            i.current
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                    />
                    {i.name}
                </Link>
            ))}
        </nav>
    );
}

export { NavigationSmall, NavigationBig };
