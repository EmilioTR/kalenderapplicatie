
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import Button from '@mui/joy/Button';


export default function CreateTodoDialog({
    newTodo,
    showCreateModal,
    setShowCreateModal,
    handleSubmit,
    handleChange,
    handleChangeDescr,
    handleCloseModal,
    handleAddToList,
    isListTodo,
    setIsListTodo,
    handleChangeColor,
    handleChangeDuration
}) {

    const handleClose = () => {
        setIsListTodo(false)
        setShowCreateModal(false)
    }
    return (
        <Transition.Root show={showCreateModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" 
            onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Nieuwe Todo
                                        </Dialog.Title>
                                        <form action="submit" onSubmit={isListTodo ? handleAddToList : handleSubmit}>
                                            <div className="flex flex-col mt-2 gap-2">
                                            <label htmlFor="title" className="text-left" >Inhoud:</label>
                                                <input type="text" name="title" id="title" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                    value={newTodo.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                                                <textarea type="text" name="beschrijving" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                    value={newTodo.description} onChange={(e) => handleChangeDescr(e)} placeholder="Beschrijving" />
                                            {isListTodo
                                            &&
                                            <div>
                                            <label htmlFor="duration" className="text-left" >Aantal uur:</label>
                                            <input type="number" name="duration" id="duration" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => handleChangeDuration(e)} placeholder="0" />
                                           
                                           </div> }
                                            
                                            <label htmlFor="color" className="text-left" >Categorie:</label>
                                            <select id="color" onChange={(e) => handleChangeColor(e)} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" >
                                                <option value="#1c5bba">
                                                Kies een kleur (default - violet)
                                                </option>
                                                <option value="#d63341">Belangrijk - (Rood)</option>
                                                <option value="#cf841b">Famillie - (Oranje)</option>
                                                <option value="#8cb849">Vrienden - (Lime)</option>
                                                <option value="#931c9e">Werk - (Paars)</option>
                                                <option value="#c9c426">School - (Geel)</option>
                                                <option value="#1c5bba">Hobby - (Blauw)</option>
                                                <option value="#3ac0cf">Sport - (Cyaan)</option>
                                                <option value="#c210bf">Andere - (Roze)</option>
                                            </select>

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
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}