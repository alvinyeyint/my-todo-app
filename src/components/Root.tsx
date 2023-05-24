import ProgressBar from '@components/ProgressBar'
import TodoTasks from '@components/TodoTasks'

const Root = () => {
  return (
    <div className="root-container">
      <div className="todo-app">
        
        <div className="progress-card">
          <h2 className="progress-title">Progress</h2>
          <ProgressBar />
        </div>

        <TodoTasks />
      </div>
    </div>
  )
}

export default Root;
