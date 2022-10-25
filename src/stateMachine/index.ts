import {
  GlobalStateContext,
  GlobalStateProvider,
  useContextMachine,
} from './StateProvider'
import useMachineContext from './useMachineContext'
import machine from './machine'
export default useMachineContext
export { GlobalStateContext, GlobalStateProvider, machine, useContextMachine }
