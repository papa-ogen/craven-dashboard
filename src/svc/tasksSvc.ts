import { iTask } from '../types'

const nameSpace = 'craven-dashboard-tasks'

export const getTasks = (): iTask[] => {
  const data = localStorage.getItem(nameSpace)

  return data ? JSON.parse(data) : []
}

export const addTask = (title: string): iTask => {
  const tasks: iTask[] = getTasks()
  const task: iTask = {
    id: `task-${tasks.length}`,
    title,
    createdAt: Date.now(),
  }

  localStorage.setItem(nameSpace, JSON.stringify([...tasks, task]))

  return task
}

export const updateTask = (task: iTask): iTask[] => {
  const tasks: iTask[] = getTasks()
  const updatedTasks = tasks.map(t => {
    if (task.id === t.id) return task
    return { ...t }
  })

  localStorage.setItem(nameSpace, JSON.stringify(updatedTasks))

  return updatedTasks
}

export const deleteTask = (id: string): iTask[] => {
  const tasks = getTasks()
  const updatedTasks = tasks.filter(task => task.id !== id)

  localStorage.setItem(nameSpace, JSON.stringify(updatedTasks))

  return updatedTasks
}

export const deleteAllTasks = () => {
  localStorage.removeItem(nameSpace)
}
