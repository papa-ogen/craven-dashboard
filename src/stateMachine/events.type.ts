import { ICredential, iTask } from '../types'

export type StateAddTaskEvent = {
  type: 'ADD_TASK'
  task: string
}

export type StateUpdateTaskEvent = {
  type: 'UPDATE_TASK'
  task: iTask
}

export type StateDeleteTaskEvent = {
  type: 'DELETE_TASK'
  id: number
}

export type StateAddLinkEvent = {
  type: 'ADD_LINK'
  id: number
  title: string
}
export type StateAddCredentialEvent = {
  type: 'ADD_CREDENTIAL'
  linkId: number
  credential: ICredential
}

export type StateEvent =
  | StateAddTaskEvent
  | StateUpdateTaskEvent
  | StateDeleteTaskEvent
  | StateAddLinkEvent
  | StateAddCredentialEvent
