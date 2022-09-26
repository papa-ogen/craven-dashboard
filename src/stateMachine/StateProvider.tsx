import React, { createContext, useContext } from 'react'
import { useInterpret, useMachine } from '@xstate/react'
import { State, Interpreter } from 'xstate'

import machine, { StateContext, StateEvent } from './machine'

type Distribute<U, C> = U extends any ? { value: U; context: C } : never // util
type StateSchema = { states: { some_state: Record<string, unknown> } }
type TypeState = Distribute<keyof StateSchema['states'], StateContext> // assuming same context

type Context = [
  State<StateContext, StateEvent, StateSchema, TypeState>,
  Interpreter<StateContext, StateSchema, StateEvent, TypeState>['send']
]

export const GlobalStateContext = createContext({} as any)

export const GlobalStateProvider = ({ children }) => {
  const svc = useMachine(machine)

  return (
    <GlobalStateContext.Provider value={svc}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useContextMachine = () => {
  const context = useContext(GlobalStateContext)

  if (context === undefined) {
    throw new Error('Wrap Context inside Service Provider')
  }

  return context
}
