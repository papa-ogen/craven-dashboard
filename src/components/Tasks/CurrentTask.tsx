import { BsCheck } from 'react-icons/bs'
import { iTask } from '../../types'

const formatDate = (date: number): string => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${d.getFullYear()}-${month}-${day}`
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
      <p className="truncate pr-2 max-w-[188px] grow">{task.title}</p>
      {!isComplete && (
        <p className="text-[10px] break-normal w-16">{formatedDate}</p>
      )}
      {!isComplete && (
        <div className="group-hover:opacity-100 opacity-0 px-2 ease-in-out duration-500">
          <BsCheck className="text-green" />
        </div>
      )}
    </div>
  )
}

export default CurrentTask
