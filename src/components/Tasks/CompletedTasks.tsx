import { BsTrash } from 'react-icons/bs'
import { iTask } from '../../types'
import CurrentTask from './CurrentTask'
import Show from '../Show'
import { deleteTask } from '../../svc/tasksSvc'

const CompletedTasks = ({ tasks }: { tasks: iTask[] }) => {
  return (
    <div>
      <h2 className="text-1xl font-extrabold text-green">Completed Tasks</h2>
      <Show
        when={tasks.filter(t => t.isCompleted).length > 0}
        fallback={<p className="text-red">No tasks yet</p>}
      >
        <ul>
          {tasks
            .filter(t => t.isCompleted)
            .map(task => (
              <li
                key={task.id}
                className="py-2 px-1 cursor-pointer hover:bg-gray flex"
              >
                <CurrentTask task={task} isComplete />
                <button type="button" onClick={() => deleteTask(task.id)}>
                  <BsTrash
                    size={24}
                    className="text-red hover:text-white"
                    title="Delete task"
                  />
                </button>
              </li>
            ))}
        </ul>
      </Show>
    </div>
  )
}

export default CompletedTasks
