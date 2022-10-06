import { iTask } from '../../types'
import Input from '../Input'
import CurrentTask from './CurrentTask'
import Show from '../Show'
import { createRef, KeyboardEvent, useState } from 'react'
import { useContextMachine } from '../../stateMachine'

const CurrentTasks = () => {
  const [state, send] = useContextMachine()
  const { tasks }: { tasks: iTask[] } = state.context
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const inputRef = createRef<HTMLInputElement>()

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
    <div className="flex-1">
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
        when={tasks && tasks.filter(t => !t.isCompleted).length > 0}
        fallback={<p className="text-red">No tasks yet</p>}
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
