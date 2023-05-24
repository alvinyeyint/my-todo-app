export const todosKeys = {
  all: ['tasks'] as const,
  lists: () => [...todosKeys.all, 'list'] as const,
  list: (filters: string | null) => [...todosKeys.lists(), { filters }] as const,
  details: () => [...todosKeys.all, 'detail'] as const,
  detail: (id: string) => [...todosKeys.all, id] as const
}
