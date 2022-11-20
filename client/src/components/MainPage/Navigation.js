import React from 'react';
import { navigation, classNames } from '../../config/navigation';
import { Link } from 'react-router-dom';

function NavigationSmall() {
    return (
        <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                >
                    <item.icon
                        className={classNames(
                            item.current
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                    />
                    {item.name}
                </a>
            ))}
        </nav>
    );
}

function NavigationBig() {
    return (
        <nav className="space-y-1 px-2">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    )}
                >
                    <item.icon
                        className={classNames(
                            item.current
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                    />
                    {item.name}
                </a>
            ))}
        </nav>
    );
}

export { NavigationSmall, NavigationBig };

<></>;
