import CurrentTasks from './CurrentTasks'
import CompletedTasks from './CompletedTasks'

const Tasks = () => {
  return (
    <div className="flex space-x-4">
      <CurrentTasks />
      <CompletedTasks />
    </div>
  )
}

export default Tasks
