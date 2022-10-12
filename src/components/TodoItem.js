import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todosState } from "../recoil";
import { updateTodo as uT, deleteTodo as dT } from "../apis";

function TodoItem({ todo, onClick }) {
  const setTodosState = useSetRecoilState(todosState);
  const [inputValue, setInputValue] = useState(todo.content);

  async function updateTodo(editTodo) {
    const updatedTodo = await uT(editTodo);
    setTodosState((oldTodosState) =>
      oldTodosState.map((ot) => (ot._id === updatedTodo._id ? updatedTodo : ot))
    );
  }

  async function deleteTodo() {
    await dT(todo._id);
    setTodosState((oldTodosState) =>
      oldTodosState.filter((ot) => ot._id !== todo._id)
    );
  }

  return (
    <li className="d-flex align-items-center mb-20">
      {todo.edit ? (
        <>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="mr-15 flex-fill"
          />
          <button
            onClick={() =>
              updateTodo({ ...todo, content: inputValue, edit: false })
            }
            className="btn btn-primary mr-15"
          >
            Sauvegarder
          </button>
          <button
            onClick={() => updateTodo({ ...todo, edit: false })}
            className="btn btn-secondary"
          >
            Annuler
          </button>
        </>
      ) : (
        <>
          <span
            className="flex-fill mr-15"
            style={{ textDecoration: todo.done && "line-through" }}
          >
            {todo.content}
          </span>
          <button
            onClick={() => updateTodo({ ...todo, done: !todo.done })}
            className="btn btn-primary mr-15"
          >
            {todo.done ? "Annuler" : "Valider"}
          </button>
          <button onClick={deleteTodo} className="btn btn-danger mr-15">
            Supprimer
          </button>
          <button
            onClick={() => updateTodo({ ...todo, edit: true })}
            className="btn btn-secondary mr-15"
          >
            Modifier
          </button>
          <button onClick={onClick} className="btn btn-primary">
            Détails
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
