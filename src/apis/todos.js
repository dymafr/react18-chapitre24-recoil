const TODO_API = "https://restapi.fr/api/recoiltodos";

export async function getTodos() {
  const response = await fetch(TODO_API);
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("error : getTodos");
  }
}

export async function getTodo(_id) {
  const response = await fetch(`${TODO_API}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("error : getTodos");
  }
}

export async function createTodo(todo) {
  const response = await fetch(TODO_API, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
    method: "POST",
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("error: create todo");
  }
}

export async function updateTodo(todo) {
  const { _id, ...todoRest } = todo;
  const response = await fetch(`${TODO_API}/${_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoRest),
    method: "PATCH",
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("error: update todo");
  }
}
export async function deleteTodo(_id) {
  const response = await fetch(`${TODO_API}/${_id}`, { method: "DELETE" });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("error: delete todo");
  }
}
