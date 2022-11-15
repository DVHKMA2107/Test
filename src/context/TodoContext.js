import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const initialValue = {
  todos: [],
  addToList: (newTask) => {},
  removeFromList: (id) => {},
  updateTask: (task) => {},
  removeDoneTask: () => {},
  toogleCheckbox: (id) => {},
}

export const TodoContext = createContext(initialValue)

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    return localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"))
  })

  const addToList = (newTask) => {
    const newTodos = [...todos, { id: uuidv4(), ...newTask }]
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  const removeFromList = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify([...newTodos]))
    setTodos([...newTodos])
  }

  const removeDoneTask = () => {
    const newTodos = todos.filter((todo) => todo.checked === false)
    localStorage.setItem("todos", JSON.stringify([...newTodos]))
    setTodos([...newTodos])
  }

  const updateTask = (task) => {
    const indexOfTask = todos.findIndex((todo) => todo.id === updateTask.id)
    const updatedTask = task
    todos.splice(indexOfTask, 1, updatedTask)
    const newTodos = [...todos]
    localStorage.setItem("todos", JSON.stringify([...newTodos]))
    setTodos([...newTodos])
  }

  const toogleCheckbox = (id) => {
    const currentTodoIndex = todos.findIndex((todo) => todo.id === id)
    todos[currentTodoIndex].checked = !todos[currentTodoIndex].checked
    localStorage.setItem("todos", JSON.stringify([...todos]))
    setTodos([...todos])
  }
  return (
    <TodoContext.Provider
      value={{
        todos,
        addToList,
        removeFromList,
        updateTask,
        toogleCheckbox,
        removeDoneTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider
