import { getTodos, addTodo, updateTodo, deleteTodo } from '@services/TodoTasks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { todosKeys } from '@config/query-key'

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useGetTodos(filterType: string | null = '') {
  return useQuery({
    queryKey: todosKeys.list(filterType),
    queryFn: () => getTodos(filterType),
    enabled: Boolean(filterType)
  })
}

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string}) => addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.lists(),
      });
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo | undefined) => updateTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.lists(),
      });
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.lists(),
      });
    },
  })
}
