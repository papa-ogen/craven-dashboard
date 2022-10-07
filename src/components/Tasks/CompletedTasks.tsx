import { BsTrash } from 'react-icons/bs'
import CurrentTask from './CurrentTask'
import Show from '../Show'
import { useContextMachine } from '../../stateMachine'
import { iTask } from 'types'

const CompletedTasks = () => {
  const [state, send] = useContextMachine()
  const { tasks }: { tasks: iTask[] } = state.context

  const onDeleteTask = (id: number) => {
    send('DELETE_TASK', { id })
  }
  return (
    <div className="flex-1">
      <h2 className="text-1xl font-extrabold text-green">Completed Tasks</h2>
      <Show
        when={tasks && tasks.filter(t => t.isCompleted).length > 0}
        fallback={<p className="text-red">No tasks yet</p>}
      >
        <ul>
          {tasks &&
            tasks
              .filter(t => t.isCompleted)
              .map(task => (
                <li
                  key={task.id}
                  className="py-2 px-1 cursor-pointer hover:bg-gray flex items-center group"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <div className="grow">
                    <CurrentTask task={task} isComplete />
                  </div>
                  <BsTrash
                    size={16}
                    className="text-red hover:text-white group-hover:opacity-100 opacity-0 ease-in-out duration-500"
                    title="Delete task"
                  />
                </li>
              ))}
        </ul>
      </Show>
    </div>
  )
}

export default CompletedTasks
