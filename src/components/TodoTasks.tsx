import { useState, useEffect } from 'react';
import { Input, Checkbox, Popover, ActionIcon, Select, Button, LoadingOverlay } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useGetTodos, useAddTodo, useDeleteTodo, useUpdateTodo } from '@queries/TodoTasks';
import ProgressBar from '@components/ProgressBar'

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoLists = () => {

  const [filterType, setFilterType] = useState<string | null>('?');
  const [inputText, setInputText] = useState('');
  const [editingItem, setEditingItem] = useState<Todo| undefined>(undefined);
  const [ percentage, setPercentage ] = useState(0);

  const { data: todos, isLoading: fetchTodoLoading } = useGetTodos(filterType);
  const { mutate: addTodoMutate } = useAddTodo();
  const { mutate: deleteTodoMutate } = useDeleteTodo();
  const { mutate: updateTodoMutate } = useUpdateTodo();

  const addTodo = (e: any) => {
    if (e.key !== 'Enter') return
    if (inputText.trim() !== '') {
      let newTodo = { title: inputText };
      addTodoMutate(newTodo)
      setInputText('');
    }
  };

  const toggleTodo = (id: string) => {
    let item = todos?.find((item: Todo) => item.id === id)
    if (item !== undefined) {
      item.completed = !item.completed
    }
    updateTodoMutate(item);
  };

  const deleteTodo = (id: string) => {
    deleteTodoMutate(id)
  };

  const setEdit = (item: Todo) => {
    setEditingItem(item)
  }

  const updateTodo = () => {
    updateTodoMutate(editingItem)
    setEditingItem(undefined)
  }
  
  let doneTasks = todos?.filter(item => item.completed).length ?? 0
  let total = todos?.length ?? 0

  useEffect(() => {
    setPercentage((doneTasks / total) * 100)
    return () => {
      setPercentage(0)
    }
  }, [doneTasks])

  return (
    <>

      <div className="progress-card">
        <h2 className="progress-title">Progress</h2>
        <ProgressBar percentage={percentage} doneTasks={doneTasks} />
      </div>

      <div className="d-flex j-content-between align-items-center">
        <h3>Tasks</h3>
        <Select
          defaultValue="all"
          placeholder="Pick one"
          radius="lg"
          size="sm"
          value={filterType} 
          onChange={setFilterType}
          data={[
            { value: '?', label: 'All' },
            { value: '?completed=true', label: 'Done' },
            { value: '?completed=false', label: 'Undone' }
          ]}
        />
      </div>

      <div className="relative">

        <LoadingOverlay visible={fetchTodoLoading} overlayBlur={2} />
        
        <ul className="list-group">
          {todos && todos.map((todo) => (
            <li
              className="list-item"
              key={todo.id}
              style={{ textDecoration: (todo.completed && editingItem?.id !== todo.id) ? 'line-through' : 'none' }}
            >
              {
                editingItem?.id === todo.id ?
                  <>
                    <Input
                      variant="unstyled"
                      value={editingItem.title}
                      onChange={(e: any) => setEditingItem({...editingItem, ...{ title: e.target.value }})}
                      className="flex-1"
                    />
                    <Button color="violet" radius="lg" onClick={updateTodo}>
                      Save
                    </Button>
                  </>
                : 
                <>
                  <Checkbox
                    label={todo.title}
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    color="violet"
                  />
                  <Popover 
                    width={100} 
                    position="bottom" 
                    withArrow 
                    arrowPosition="side" 
                    shadow="md"
                    radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconDots size="2rem" />
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <ul className="action-btn-group">
                        <li onClick={() => setEdit(todo)}>Edit</li>
                        <li className="text-danger" onClick={() => deleteTodo(todo.id)}>Delete</li>
                      </ul>
                    </Popover.Dropdown>
                  </Popover>
                </>
              }
              
            </li>
          ))}
        </ul>
      </div>
      

      <Input
        className="flex-1 flex-gap"
        placeholder="Add your todo..."
        radius="xl"
        size="md"
        type="text"
        value={inputText}
        onChange={(e: any) => setInputText(e.target.value)}
        onKeyPress={addTodo}
      />
    </>
  )
}

export default TodoLists;