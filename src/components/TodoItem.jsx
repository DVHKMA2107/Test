import React, { useContext, useState } from "react"
import FormData from "./FormData"

import "../styles/TodoItem.css"
import { TodoContext } from "../context/TodoContext"

const TodoItem = ({ id, title, desc, expiredDate, priority, checkedValue }) => {
  const [hideDetail, setHideDetail] = useState(true)
  const [checked, setChecked] = useState(checkedValue)
  const { removeFromList, toogleCheckbox } = useContext(TodoContext)
  const removeFromListHandler = (id) => {
    removeFromList(id)
    setHideDetail(true)
  }

  const checkedChangeHandler = (id) => {
    setChecked(!checked)
    toogleCheckbox(id)
  }

  return (
    <>
      <div className="todo-item">
        <div className="retangle">
          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={checkedChangeHandler.bind(null, id)}
            />
            <span>{title}</span>
          </div>

          <div>
            <button
              className="button-update button-detail"
              onClick={() => setHideDetail(!hideDetail)}
            >
              Detail
            </button>
            <button
              className="button-update button-remove"
              onClick={() => removeFromListHandler(id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {!hideDetail && (
        <div className="detail-section">
          <FormData
            id={id}
            titleDetail={title}
            descDetail={desc}
            expiredDateDetail={expiredDate}
            priorityDetail={priority}
            isChecked={checked}
            onToogle={() => setHideDetail(true)}
          />
        </div>
      )}
    </>
  )
}

export default TodoItem
