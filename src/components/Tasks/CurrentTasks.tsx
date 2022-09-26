import { addTask, updateTask } from '../../svc/tasksSvc'
import { iTask } from '../../types'
import Input from '../Input'
import CurrentTask from './CurrentTask'
import Show from '../Show'
import { createRef, KeyboardEvent, useState } from 'react'

type CurrentTasksProps = {
  tasks: iTask[]
  setTasks: (tasks: iTask[]) => void
}

const CurrentTasks = ({ tasks, setTasks }: CurrentTasksProps) => {
  const [inputValue, setInputValue] = useState(null)
  const inputRef = createRef<HTMLInputElement>()
  const onAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue) {
        const task = addTask(inputValue)

        setTasks([...tasks, task])

        setInputValue(null)
      }
    }
  }

  const onCompleteTask = (task: iTask) => {
    const completedTask: iTask = { ...task, isCompleted: true }
    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) return completedTask

      return { ...t }
    })

    updateTask(completedTask)
    setTasks(updatedTasks)
  }

  return (
    <div>
      <h2 className="text-1xl font-extrabold text-blue">Current Tasks</h2>
      <Input
        id="add-task"
        onKeyDown={onAddTask}
        placeholder="Add task"
        ref={inputRef}
        onFocus={() => inputRef?.current?.select()}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Show
        when={tasks.filter(t => !t.isCompleted).length > 0}
        fallback={<p className="text-red">No tasks yet</p>}
      >
        <ul>
          {tasks
            .filter(t => !t.isCompleted)
            .map(task => (
              <li
                key={task.id}
                className="py-2 px-1 cursor-pointer hover:bg-gray"
              >
                <CurrentTask task={task} onCompleteTask={onCompleteTask} />
              </li>
            ))}
        </ul>
      </Show>
    </div>
  )
}

export default CurrentTasks
