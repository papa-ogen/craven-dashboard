import { BsCheck, BsBug } from 'react-icons/bs'
import { iTask } from '../../types'

const formatDate = (date: number): string => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${d.getFullYear()}-${month}-${day}`
}

const BugTask = () => (
  <span className="align-middle mr-2">
    <BsBug className="text-red-600" />
  </span>
)

const TaskIcon = ({ task }: { task: iTask }) => {
  return task.title.startsWith('bug:') ? <BugTask /> : null
}

const CurrentTask = ({
  task,
  onCompleteTask,
  isComplete,
}: {
  task: iTask
  onCompleteTask?: (task: iTask) => void
  isComplete?: boolean
}) => {
  const formatedDate = formatDate(task.createdAt)

  return (
    <div
      className={`flex items-center${isComplete ? ' line-through' : ''}`}
      onClick={() => onCompleteTask && onCompleteTask(task)}
      title={task.title}
    >
      {!isComplete && <TaskIcon task={task} />}
      <p className="flex-grow pr-2 min-w-fit">{task.title}</p>
      {!isComplete && (
        <p className="text-[10px] break-normal w-16 justify-self-end">
          {formatedDate}
        </p>
      )}
      {!isComplete && (
        <div className="group-hover:opacity-100 opacity-0 px-2 ease-in-out duration-500 justify-self-end">
          <BsCheck className="text-lime-500" />
        </div>
      )}
    </div>
  )
}

export default CurrentTask
