import { useState } from 'react'
import { ILink } from '../types'
import Links from './Links'

const Header = () => {
  return (
    <h1 className="text-4xl font-extrabold tracking-wide text-center pb-2">
      <span className="text-orange">craven</span>
      <span className="text-lightGray">Dashboard</span>
    </h1>
  )
}

const App = () => {
  // const [task, setTask] = createStore<iTask[]>([])
  const [links, setLinks] = useState<ILink[]>([])

  // onMount(async () => {
  //   const dblinks = await getLinks()
  //   const tasks = await getTasks()

  //   setTask(tasks)
  //   setLinks(dblinks)
  // })

  return (
    // <ErrorBoundary fallback={(err: any) => err}>
    <div className="flex flex-col p-4">
      <Header />
      <div className="text-lightGray flex">
        <div className="grow">
          <Links links={links} setLinks={setLinks} />
        </div>
        <div className="w-[500px]">
          {/* <Tasks tasks={task} setTasks={setTask} /> */}
        </div>
      </div>
    </div>
    // </ErrorBoundary>
  )
}

export default App
