import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../classNames';
import { useSelector, useDispatch } from 'react-redux';
import { selectPresets } from '../../store';
function PresetsSlotSelection(p) {
    const presets = useSelector(selectPresets());

    const { preset } = p;
    console.log(preset);
    console.log(presets);
    let currentPreset = presets.find((i) => {
        return i.id === preset;
    });
    if (!currentPreset) {
        currentPreset = presets.find((i) => {
            return i.id === 0;
        });
    }
    const [selected, setSelected] = useState(currentPreset);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(setPresetById(selected.id));
    // }, [selected]);
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="ml-12 relative mt-1 w-3/4">
                        <Listbox.Button className="text-white relative w-1/2 cursor-default rounded-md border border-blue-300 bg-blue-600 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className="block truncate">
                                {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-1/2 overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {presets.map((i) => (
                                    <Listbox.Option
                                        key={i.id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'text-white bg-blue-600'
                                                    : 'text-white',
                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                            )
                                        }
                                        value={i}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? 'font-semibold'
                                                            : 'font-normal',
                                                        'block truncate',
                                                    )}
                                                >
                                                    {i.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? 'text-white'
                                                                : 'text-blue-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}

export { PresetsSlotSelection };
