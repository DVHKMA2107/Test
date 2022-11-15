import React, { useContext, useState } from "react"
import "../styles/TodoList.css"
import TodoItem from "./TodoItem"
import { TodoContext } from "../context/TodoContext"

const TodoList = () => {
  const { todos, removeDoneTask } = useContext(TodoContext)
  const [searchText, setSearchText] = useState("")

  const sortedTodos = todos.sort((a, b) => {
    const timeA = new Date(a.expiredDate).getTime()
    const timeB = new Date(b.expiredDate).getTime()
    return timeA - timeB
  })

  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.includes(searchText)
  )

  let isShowAction = false
  todos.forEach((todo) => {
    if (todo.checked === true) isShowAction = true
  })

  return (
    <div className="todo-list">
      <h6 className="title">Todo List</h6>
      <input
        className="text-input"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          desc={todo.description}
          expiredDate={todo.expiredDate}
          priority={todo.priority}
          checkedValue={todo.checked}
          id={todo.id}
        />
      ))}

      {isShowAction && (
        <div className="action">
          <p>Bulk Action:</p>
          <div className="action-button">
            <button className="action-button__success">Done</button>
            <button className="action-button__remove" onClick={removeDoneTask}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoList
