import { selectFilteredTodos, selectTodoDetails } from "../recoil";
import { useRecoilValue } from "recoil";
import TodoItem from "./TodoItem";
import { useState } from "react";
import TodoDetails from "./TodoDetails";

function TodoList() {
  const [id, setId] = useState(null);
  const filteredTodos = useRecoilValue(selectFilteredTodos);
  const todoDetails = useRecoilValue(selectTodoDetails(id));

  function selectTodo(_id) {
    setId(_id);
  }

  return (
    <>
      <ul className="mb-20">
        {filteredTodos &&
          filteredTodos.map((t) => (
            <TodoItem key={t._id} todo={t} onClick={() => selectTodo(t._id)} />
          ))}
      </ul>
      {todoDetails && <TodoDetails todo={todoDetails} />}
    </>
  );
}

export default TodoList;
