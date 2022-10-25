import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'

import machine from './machine'

export const GlobalStateContext = createContext({} as any)

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
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
