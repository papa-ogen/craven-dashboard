import Tasks from './Tasks'
import Links from './Links'
import { useContextMachine } from '../stateMachine'
import 'flowbite'

// import { linksSvc } from '../svc'

const Header = () => {
  return (
    <h1 className="text-4xl font-extrabold tracking-wide text-center pb-2">
      <span className="tk-uniwars text-primary-orange">Craven</span>
      <span className="text-gray-300 font-zonapro zonapro">Dashboard</span>
    </h1>
  )
}

const App = () => {
  const [state] = useContextMachine()
  // linksSvc.deleteAllLinks()

  if (state.matches('error'))
    return <p className="text-red-600">{state.context.error}</p>

  return (
    <div className="flex flex-col p-4 min-h-screen bg-hero">
      <Header />
      <div className="text-gray-300 flex gap-4">
        <div className="grow">
          <Links />
        </div>
        <div className="w-[600px] flex justify-end">
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default App
