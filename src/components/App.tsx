import { useEffect, useState } from 'react'
import { ILink, iTask } from '../types'
import Links from './Links'
import Tasks from './Tasks'
import { getLinks } from '../svc/linksSvc'
import { getTasks } from '../svc/tasksSvc'

const Header = () => {
  return (
    <h1 className="text-4xl font-extrabold tracking-wide text-center pb-2">
      <span className="text-orange">craven</span>
      <span className="text-lightGray">Dashboard</span>
    </h1>
  )
}

const App = () => {
  const [task, setTask] = useState<iTask[]>([])
  const [links, setLinks] = useState<ILink[]>([])

  useEffect(() => {
    const getData = async () => {
      const dblinks = await getLinks()
      const tasks = await getTasks()

      setTask(tasks)
      setLinks(dblinks)
    }

    getData()
  }, [])

  return (
    <div className="flex flex-col p-4">
      <Header />
      <div className="text-lightGray flex">
        <div className="grow">
          <Links links={links} setLinks={setLinks} />
        </div>
        <div className="w-[500px]">
          <Tasks tasks={task} setTasks={setTask} />
        </div>
      </div>
    </div>
  )
}

export default App
