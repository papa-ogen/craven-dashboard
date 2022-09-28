import Tasks from './Tasks'
import Links from './Links'
import { useContextMachine } from '../stateMachine'
// import { linksSvc } from '../svc'

const isLoading = (state: any) => {
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
  // linksSvc.deleteAllLinks()
  console.log(state?.context, isLoading(state), state.matches('loadingTasks'))

  if (state.matches('error'))
    return <p className="text-red">{state.context.error}</p>

  return (
    <div className="flex flex-col p-4">
      <Header />
      <div className="text-lightGray flex gap-4">
        <div className="grow">
          <Links />
        </div>
        <div className="w-[500px]">
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default App
