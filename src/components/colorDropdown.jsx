import React from 'react';
import { Box } from '@mui/material';
import Select, { components } from 'react-select';

const CustomOption = (props) => {
    const color = props.data.value;
    return (
        <components.Option {...props}>
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color,
                    display: 'inline-block',
                    marginRight: '10px',
                }}
            />
            {props.data.label}
        </components.Option>
    );
};


const colorOptions = [
    { value: '#8b5cf6', label: 'Todo (Standaard)' }, // (Standaard - Violet)
    { value: '#d63341', label: 'Belangrijk ' }, //- (Rood)
    { value: '#cf841b', label: 'Famillie ' }, //- (Oranje)
    { value: '#8cb849', label: 'Vrienden' }, // - (Lime)
    { value: '#931c9e', label: 'Werk ' }, //- (Paars)
    { value: '#c9c426', label: 'School ' }, //- (Geel)
    { value: '#1c5bba', label: 'Hobby' }, // - (Blauw)
    { value: '#3ac0cf', label: 'Sport ' }, // - (Cyaan)
    { value: '#c210bf', label: 'Andere ' }, //- (Roze)
];

const FormWithColorSelect = ({
    isListTodo,
    handleChange,
    handleChangeDescr,
    handleChangeColor,
    handleChangeDuration,
    handleAddToList,
    handleSubmit,
    newTodo,
    handleCloseModal,
}) => {
    const onSubmit = isListTodo ? handleAddToList : handleSubmit;

    return (
        <form action="submit" onSubmit={onSubmit}>
            <div className="flex flex-col mt-2 gap-2">
                <label htmlFor="title" className="text-left">
                    Inhoud:
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    value={newTodo.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <textarea
                    type="text"
                    name="beschrijving"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    value={newTodo.description}
                    onChange={handleChangeDescr}
                    placeholder="Beschrijving"
                />

                {isListTodo && (
                    <div>
                        <label htmlFor="duration" className="text-left">
                            Aantal uur:
                        </label>
                        <input
                            type="number"
                            step={0.25}
                            name="duration"
                            id="duration"
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeDuration}
                            placeholder="1"
                        />
                    </div>
                )}

                <label htmlFor="color" className="text-left">
                    Categorie:
                </label>
                <Select
                    id="color"
                    components={{ Option: CustomOption }}
                    options={colorOptions}
                    onChange={handleChangeColor}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />

            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md !bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:!bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                    disabled={newTodo.title === ''}
                >
                    Aanmaken
                </button>

                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md !bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:!bg-gray-100 sm:col-start-1 sm:mt-0"
                    onClick={handleCloseModal}
                >
                    Annuleren
                </button>
            </div>
        </form>
    );
};

export default FormWithColorSelect;
