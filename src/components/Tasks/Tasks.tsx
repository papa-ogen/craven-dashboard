import CurrentTasks from './CurrentTasks'
import CompletedTasks from './CompletedTasks'

const Tasks = () => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <CurrentTasks />
      <CompletedTasks />
    </div>
  )
}

export default Tasks
