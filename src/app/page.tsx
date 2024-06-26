"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import nlLocale from "@fullcalendar/core/locales/nl";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/deleteTodoDialog";
import CreateTodoDialog from "@/components/createTodoDialog";
import ShowTodoDialog from "@/components/showTodoDialog";
import BrainDumpDrawer from "@/components/braindump/brainDumpDrawer";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import ShowListTodo from '@/components/showListTodo';
import ProgressBar from '@/components/badges/progressBar';
import data from '@/app/data/defaultEvents.json'
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';


interface Todo {
  id: number;
  title: string;
  description: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  done: boolean;
  duration: number;
}

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([
    { title: 'Voetballen', description: 'Ik moet gaan voetballen, het is training', id: 0, backgroundColor: '#3ac0cf', borderColor: "#3ac0cf", textColor: 'white', allDay: false, start: '', end: '', done: false, duration: 2.5 },
    { title: 'Fietsen', description: 'Voorbereiden op fietstoernooi, moet een fietstour van 20km fietsen onder de 40 minuten', id: 1, backgroundColor: '#3ac0cf', borderColor: "#3ac0cf", textColor: 'white', allDay: false, start: '', end: '', done: false, duration: 2 },
    { title: 'Cinema met Carlos', description: 'We gaan eindelijk Dune 2 gaan kijken!!! Lisan Al Gaiiiib!', id: 2, backgroundColor: '#8cb849', borderColor: "#8cb849", textColor: 'white', allDay: false, start: '', end: '', done: false, duration: 3 },
    { title: 'Taak Wiskunde II afwerken', description: 'Oefening 1.3 t.e.m. oef 3.3 afwerken. DEADLINE: 17/06', id: 3, backgroundColor: '#c9c426', borderColor: "#c9c426", textColor: 'white', allDay: false, start: '', end: '', done: false, duration: 4.5 },
    { title: 'Maandelijkse checkup van oma bij het ziekenhuis', description: 'Moet oma voeren naar het ziekenhuis om haar bloed te laten checken. ', id: 5, backgroundColor: '#d63341', borderColor: "#d63341", textColor: 'white', allDay: false, start: '', end: '', done: false, duration: 2 },
  ])


  const emptyTodo: Todo = {
    id: 0,
    title: '',
    description: '',
    backgroundColor: '#8b5cf6',
    borderColor: "#8b5cf6",
    textColor: "",
    allDay: false,
    start: '',
    end: '',
    done: false,
    duration: 0
  }

  const [allTodos, setAllTodos] = useState<Todo[]>(data.events)
  const [doneTodos, setDoneTodos] = useState<Todo[]>([])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDisplayModal, setShowDisplayModal] = useState(false)
  const [showListTodoModal, setShowListTodoModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)
  const [isListTodo, setIsListTodo] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

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
          let end = todoEl.getAttribute("end")

          return { id, title, start, end, description }
        }
      })
    }
  }, [])



  const handleDateClick = (arg: { date: Date, allDay: boolean }) => {       // id mss later nog op andere manier doen
    setNewTodo({ ...newTodo, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setShowCreateModal(true)
  }

  const handleDateSelect = (data: any) => {
    setNewTodo({ ...newTodo, ...data, id: new Date().getTime() })
    setShowCreateModal(true)
  }



  const addTodo = (data: DropArg) => {

    const selectedTodo = todos.find(todo => todo.title === data.draggedEl.innerText) || { title: 'Er ging iets mis', description: 'Dit is geen todo', id: 999, backgroundColor: 'red', borderColor: "darkred", textColor: 'darkred', duration: 0 }
    const start = data.date;
    const end = new Date(start.getTime() + selectedTodo.duration * 60 * 60 * 1000);
    const todo = {
      ...newTodo,
      id: new Date().getTime(),
      title: selectedTodo.title,
      description: selectedTodo.description,
      allDay: data.allDay,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: selectedTodo.backgroundColor,
      borderColor: selectedTodo.borderColor,
    }

    setTodos(todos.filter(todo => todo.title !== data.draggedEl.innerText))
    setAllTodos([...allTodos, todo])
  }

  const handleDeleteModal = (data: any) => {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.id))
  }

  const closeShowListTodo = () => {
    setShowListTodoModal(false)
    setIsListTodo(false)
  }

  const handleShowModal = (data: { event: { id: string } }) => {
    setShowDisplayModal(true)
    setSelectedTodo(allTodos.filter(todo => Number(todo.id) === Number(data.event.id))[0])
  }

  const handleShowListTodo = (id: Number) => {
    setIsListTodo(true)
    setShowListTodoModal(true)
    todos.forEach(todo => {
      if (todo.id === id) {
        setSelectedTodo({ ...todo, start: '', allDay: false })
      }
    })
  }

  const handleDelete = () => {
    if (isListTodo) {
      setTodos(todos.filter(todo => Number(todo.id) !== Number(idToDelete)))
    }
    setAllTodos(allTodos.filter(todo => Number(todo.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
    setShowCreateModal(false)
    setIsListTodo(false)
    setNewTodo(emptyTodo)
    setIdToDelete(null)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
      id: new Date().getTime()
    })
  }

  const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      description: e.target.value
    })
  }

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      duration: Number(e.target.value)
    })
  }

  const handleChangeColor = (e: any): void => {
    setNewTodo({
      ...newTodo,
      backgroundColor: `${e.value}`,
      borderColor: `${e.value}`,
      textColor: "white",
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
    if (!doneTodos.find(done => done.id === todo.id)) {
      setDoneTodos([...doneTodos, todo])
    }

    todo.backgroundColor = "lightgreen"
    todo.borderColor = "green"
    todo.textColor = "darkgreen"
    todo.done = true

    setShowDisplayModal(false)
    setAllTodos(allTodos.filter(events => Number(todo.id) !== Number(events.id)))
    setAllTodos([...allTodos, todo])
  }

  const handleEventResize = (info: any) => {
    const updated = allTodos.find(events => Number(info.event.id) === Number(events.id))
    const newTodoList = allTodos.filter(events => Number(info.event.id) !== Number(events.id))
    if (updated) {
      updated.start = info.event.start
      updated.end = info.event.end
      updated.allDay = info.event.allDay
      setAllTodos([...newTodoList, updated])
    }
  }

  return (
    <>
      <main className="h-screen hidden md:block">
        <div className="border-b border-violet-100">
          <nav className="grid items-center w-full px-5 py-2   ">
            <div className="justify-self-start row-start-1">
              <h1 className="font-bold text-2xl text-gray-700 justify-self-start ">
                <span>
                  Kalenderapp
                  <span> </span>
                  <a href="https://docs.google.com/document/d/1KzoRbyrtnjOYZwipLKOASKP2WVXzVh2GSE9wU1WMx48/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Tooltip title="Handleiding">
                      <InfoIcon className="text-md hover:text-gray-500" />
                    </Tooltip>
                  </a>
                </span>
              </h1>
            </div>
            <div className="justify-self-center row-start-1">
              <ProgressBar  {...{ doneTodos, }}></ProgressBar>
            </div>
            <div className="justify-self-end row-start-1">
              <button
                className="inline-flex rounded-md h-fit border border-transparent items-center bg-violet-100 px-4 py-4 text-md font-medium text-violet-900 hover:bg-violet-200"
                onClick={() => setOpenDrawer(!openDrawer)}
              > Brain Dump
              </button>
            </div>
          </nav>
        </div>

        <div className="flex flex-row px-5">
          <div className="fc-view">
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
              locale={nlLocale}
              events={allTodos as EventSourceInput}
              initialView='timeGridWeek'
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              select={(data) => handleDateSelect(data)}
              drop={(data) => addTodo(data)}
              eventClick={(data) => handleShowModal(data)}
              height="80vh"
              eventResize={(info) => handleEventResize(info)}
              eventDrop={(info) => handleEventResize(info)}
            />
          </div>

          <div className="lg:mr-5 lg:ml-2">
            <div id="draggable-el" className="w-[150px] lg:w-[260px] border-2 p-2 rounded-md h-[78vh] mt-5 bg-violet-50">
              <div className="flex flex-row w-full justify-between">
                <h1 className="font-bold text-lg text-center m-auto">
                  In te plannen events
                </h1>
                <button className="hover:text-slate-500"
                  onClick={() => {
                    setIsListTodo(true)
                    setShowCreateModal(true)
                  }
                  }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </div>
              <div className="h-[95%] overflow-x-clip overflow-y-auto">
                {
                  todos.map(todo => (
                    <div
                      className={"fc-event text-slate-50 border border-slate-100 p-1 m-2 w-full rounded-md ml-auto text-center hover:opacity-85 cursor-grab active:cursor-grabbing"}
                      style={{ backgroundColor: todo.backgroundColor }}
                      title={todo.title}
                      key={todo.id}
                      onClick={() => handleShowListTodo(todo.id)}
                    >
                      {todo.title}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <DeleteDialog {...{ showDeleteModal, setShowDeleteModal, handleDelete, handleCloseModal, setShowDisplayModal, setShowListTodoModal, isListTodo }} />

          <CreateTodoDialog {...{ newTodo, showCreateModal, setShowCreateModal, handleSubmit, handleChange, handleChangeDescr, handleCloseModal, handleAddToList, isListTodo, setIsListTodo, handleChangeColor, handleChangeDuration }} />

          <ShowTodoDialog {...{ selectedTodo, showDisplayModal, setShowDisplayModal, handleDeleteModal, setTodoAsDone }}></ShowTodoDialog>

          <ShowListTodo {...{ selectedTodo, showListTodoModal, setShowListTodoModal, handleDeleteModal, handleCloseModal, closeShowListTodo }} />

          <BrainDumpDrawer {...{ openDrawer, setOpenDrawer }} />


        </div>

      </main>

      <div className="flex  md:hidden justify-center items-center align-middle content-center w-full h-[80vh] text-lg font-extrabold  ">
        <div className="bg-slate-300 flex flex-col p-4 max-w-[80vw] rounded-md gap-3">
          <p>Gelieve deze kalender op een groter scherm te openen voor een optimaal verloop van dit ondezoek.</p>
          <p>Wegens beperkte tijd voor het bouwen van deze kalender is deze niet responsive voor schermen smaller dan 800px.</p>
          <p>Bedankt voor uw begrip.</p>
        </div>

      </div>
    </>
  );
}
