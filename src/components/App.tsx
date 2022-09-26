import { useContext } from 'react'
import Tasks from './Tasks'
import { GlobalStateContext, useContextMachine } from '../stateMachine'
import { useSelector } from '@xstate/react'
import { tasksSvc } from '../svc'
const isLoading = state => {
  return state.matches('loadingTasks')
}

const Header = () => {
  return (
    <h1 className="text-4xl font-extrabold tracking-wide text-center pb-2">
      <span className="text-orange">craven</span>
      <span className="text-lightGray">Dashboard</span>
    </h1>
  )
}

const App = () => {
  const [state] = useContextMachine()
  // tasksSvc.deleteAllTasks()
  console.log(state?.context, isLoading(state), state.matches('loadingTasks'))
  return (
    <div className="flex flex-col p-4">
      <Header />
      <div className="text-lightGray flex">
        <div className="grow">{/* <Links /> */}</div>
        <div className="w-[500px]">
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default App
