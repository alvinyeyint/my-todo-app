import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL ?? '';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface AddTodoPayload {
  title: string
}

export const getTodos = (filterType: string | null): Promise<Todo[]> =>
  axios.get(`${API_URL}/todos${filterType}`).then((response) => response.data ?? [])

export const addTodo = (payload: AddTodoPayload): Promise<Todo> =>
  axios.post(`${API_URL}/todos`, payload).then((response) => response.data ?? [])

export const updateTodo = (payload: Todo | undefined): Promise<Todo> =>
  axios.put(`${API_URL}/todos/${payload?.id}`, payload).then((response) => response.data ?? [])

export const deleteTodo = (id: string): Promise<Todo> =>
  axios.delete(`${API_URL}/todos/${id}`).then((response) => response.data ?? [])
