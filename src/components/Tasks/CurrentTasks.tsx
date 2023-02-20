import { iTask } from '../../types'
import Input from '../Form/Input'
import CurrentTask from './CurrentTask'
import Show from '../Show'
import { createRef, KeyboardEvent, useState } from 'react'
import { useContextMachine } from '../../stateMachine'

const CurrentTasks = () => {
  const [state, send] = useContextMachine()
  const { tasks }: { tasks: iTask[] } = state.context
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const inputRef = createRef<HTMLInputElement>()
  const inCompletedTasks = tasks.filter(t => !t.isCompleted).length

  const onAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue) {
        send('ADD_TASK', { task: inputValue })

        setInputValue(undefined)
      }
    }
  }

  const onCompleteTask = (task: iTask) => {
    const completedTask: iTask = { ...task, isCompleted: true }

    send('UPDATE_TASK', { task: completedTask })
  }

  return (
    <div>
      <h2 className="text-1xl font-extrabold text-blue-400">
        Current Tasks
        {inCompletedTasks ? ` (${inCompletedTasks})` : null}
      </h2>
      <div className="max-w-sm">
        <Input
          id="add-task"
          onKeyDown={onAddTask}
          placeholder="Add task"
          ref={inputRef}
          onFocus={() => inputRef?.current?.select()}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <Show
        when={tasks && inCompletedTasks > 0}
        fallback={<p className="text-red-600">No tasks yet</p>}
      >
        <ul>
          {tasks &&
            tasks
              .filter(t => !t.isCompleted)
              .map(task => (
                <li
                  key={task.id}
                  className="py-2 px-1 cursor-pointer hover:bg-gray group"
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
