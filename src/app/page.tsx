"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import DeleteDialog from "@/components/deleteTodoDialog";
import CreateTodoDialog from "@/components/createTodoDialog";
import ShowTodoDialog from "@/components/showTodoDialog";
import { Calendar, EventSourceInput } from "@fullcalendar/core/index.js";


interface Todo {
  id: number;
  title: string;
  description: string;
  start: Date | string;
  allDay: boolean;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export default function Home() {

  const [todos, setTodos] = useState([
    { title: 'todo1', description: 'beschrijving van de eerste taak', id: 0, backgroundColor: '', borderColor: "" , textColor: '' },
    { title: 'todo2', description: 'beschrijving van de tweede taak', id: 1, backgroundColor: '', borderColor: "" , textColor: '' },
    { title: 'todo3', description: 'beschrijving van de derde taak', id: 2,  backgroundColor: '', borderColor: "" , textColor: '' },
    { title: 'todo4', description: 'beschrijving van de vierde taak', id: 3, backgroundColor: '', borderColor: "" , textColor: '' },
    { title: 'Kleine testcase met grote titel', description: 'beschrijving van de vijfde taak die eigelijk ook wel een zeer lange beschrijving heeft om de UI eens te testen want je weet nooit wat er kan gebeuren in het leven...', id: 5, backgroundColor: '', borderColor: "" , textColor: '' },
  ])

  const emptyTodo = {
    id: 0,
    title: '',
    start: '',
    description: '',
    backgroundColor: '',
    borderColor: "",
    textColor: "",
    allDay: false,
  }

  let rerender = "ik ben echt gewoon een goofy variabele"
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [doneTodos, setDoneTodos] =useState<Todo[]>([])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDisplayModal, setShowDisplayModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)
  const [isListTodo, setIsListTodo] = useState(false)

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (todoEl) {
          let id = todoEl.getAttribute("data")
          let title = todoEl.getAttribute("title")
          let description = todoEl.getAttribute("description")
          let start = todoEl.getAttribute("start")

          return { id, title, start, description }
        }
      })
    }
  }, [])



  const handleDateClick = (arg: { date: Date, allDay: boolean }) => {       // id mss later nog op andere manier doen
    setNewTodo({ ...newTodo, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setShowCreateModal(true)
  }

  const addTodo = (data: DropArg) => {       // id mss later nog op andere manier doen
   // console.log("DATA", data)
    const selectedTodo = todos.find(todo => todo.title === data.draggedEl.innerText) || { title: 'Er ging iets mis', description: 'Dit is geen todo', id: 999, backgroundColor: 'red', borderColor: "darkred" , textColor: 'darkred' }
    const todo = {
      ...newTodo,
      id: new Date().getTime(),
      title: selectedTodo.title,
      description: selectedTodo.description,
      allDay: data.allDay,
      start: data.date.toISOString(),
      backgroundColor: selectedTodo.backgroundColor
    }

    setTodos(todos.filter(todo => todo.title !== data.draggedEl.innerText))

    setAllTodos([...allTodos, todo])
  }

  const handleDeleteModal = (data: any) => {
    console.log(data)
    setShowDeleteModal(true)
    setIdToDelete(Number(data.id))
  }

  const handleShowModal = (data: { event: { id: string } }) => {
    setShowDisplayModal(true)
    console.log(data)
    setSelectedTodo(allTodos.filter(todo => Number(todo.id) === Number(data.event.id))[0])
  }

  const handleDelete = () => {
    setAllTodos(allTodos.filter(todo => Number(todo.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
    setIsListTodo(false)
    setNewTodo(emptyTodo)
    setShowDeleteModal(false)
    setIdToDelete(null)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      title: e.target.value
    })
  }

  const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      description: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAllTodos([...allTodos, newTodo])
    setShowCreateModal(false)
    setNewTodo(emptyTodo)
  }

  const handleAddToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsListTodo(false)
    setTodos([...todos, newTodo])
    setShowCreateModal(false)
    setNewTodo(emptyTodo)
  }

  const setTodoAsDone = (todo: Todo) => {
      setDoneTodos([...doneTodos, todo])
      todo.backgroundColor = "lightgreen"
      todo.borderColor = "green"
      todo.textColor = "darkgreen"
      setShowDisplayModal(false)
      console.log("ik besta")
      setAllTodos(allTodos.filter(events => Number(todo.id) !== Number(events.id)))
      setAllTodos([...allTodos, todo])
  }

  return (

    <>
      <nav className="flex justify-between border-b border-violet-100 p-4">

        <h1 className="font-bold text-2xl text-gray-700"> Calendar</h1>

        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-md font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => console.log(doneTodos)}
        > Progress</button>
      </nav>

      <main className="flex h-min-screen flex-col items-center justify-between">
        <div className="fc-view grid grid-cols-10 p-5">
          <div className="col-span-8">

            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                listPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,dayGridMonth,listWeek'
              }}
              events={allTodos as EventSourceInput}
              initialView='timeGridWeek'
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addTodo(data)}
              eventClick={(data) => handleShowModal(data)}
              height={800}
            />
          </div>

          <div id="draggable-el" className="ml-8 w-[250px] border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
            <div className="flex flex-row w-full justify-between">
              <h1 className="font-bold text-lg text-center">Drag Todo's</h1>
              <button className="hover:text-slate-500"
                onClick={() => {
                  setIsListTodo(true)
                  setShowCreateModal(true)}
                }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>

            </div>
            {
              todos.map(todo => (
                <div
                  className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                  title={todo.title}
                  key={todo.id}
                >
                  {todo.title}

                </div>
              ))
            }
          </div>
        </div>

        <DeleteDialog {...{ showDeleteModal, setShowDeleteModal, handleDelete, handleCloseModal }} />

        <CreateTodoDialog {...{ newTodo, showCreateModal, setShowCreateModal, handleSubmit, handleChange, handleChangeDescr, handleCloseModal, handleAddToList, isListTodo, setIsListTodo }} />

        <ShowTodoDialog {...{ selectedTodo, showDisplayModal, setShowDisplayModal, handleDeleteModal, setTodoAsDone }}></ShowTodoDialog>
      </main>

    </>
  );
}
