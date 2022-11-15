import React from "react"
import "../styles/NewTodo.css"

import FormData from "./FormData"

const NewTodo = () => {
  return (
    <div className="new-todo">
      <h2 className="title">New Task</h2>
      <FormData />
    </div>
  )
}

export default NewTodo
