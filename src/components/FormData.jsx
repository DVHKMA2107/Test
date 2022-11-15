import React, { useContext, useState } from "react"
import { TodoContext } from "../context/TodoContext"
import { formatDateToString } from "../helpers/formatDate"
import "../styles/FormData.css"

const FormData = ({
  id,
  titleDetail,
  descDetail,
  expiredDateDetail,
  priorityDetail,
  isChecked,
  onToogle,
}) => {
  const [title, setTitle] = useState(titleDetail || "")
  const [description, setDescription] = useState(descDetail || "")
  const [expiredDate, setExpiredDate] = useState(() => {
    return expiredDateDetail
      ? expiredDateDetail
      : formatDateToString(new Date(Date.now()))
  })
  const [priority, setPriority] = useState(priorityDetail || "normal")

  const { updateTask, addToList } = useContext(TodoContext)

  const submitHandler = (e) => {
    e.preventDefault()

    if (title.trim() === "") {
      alert("Title is required")
      return
    }

    if (new Date(expiredDate).getTime() < Date.now()) {
      alert("Invalid expired date")
      return
    }

    if (id) {
      updateTask({
        id,
        title,
        description,
        expiredDate,
        priority,
        checked: isChecked,
      })
      onToogle()
      return
    }

    addToList({ checked: false, title, description, expiredDate, priority })

    setTitle("")
    setDescription("")
    setExpiredDate("2022-11-12")
    setPriority("normal")
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Add new task..."
        className="text-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="text-area">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="priority-date">
        <div className="text-date">
          <label>Due date</label>
          <input
            type="date"
            value={expiredDate}
            onChange={(e) => {
              setExpiredDate(e.target.value)
            }}
          />
        </div>

        <div className="text-select">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button type="submit" className="button button-add">
        {id ? "Update" : "Add"}
      </button>
    </form>
  )
}

export default FormData
