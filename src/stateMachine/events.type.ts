import { ICredential, ILink, iTask } from '../types'

type StateAddTaskEvent = {
  type: 'ADD_TASK'
  task: string
}

type StateUpdateTaskEvent = {
  type: 'UPDATE_TASK'
  task: iTask
}

type StateDeleteTaskEvent = {
  type: 'DELETE_TASK'
  id: number
}

type StateAddLinkEvent = {
  type: 'ADD_LINK'
  link: ILink
}

type StateDeleteLinkEvent = {
  type: 'DELETE_LINK'
  linkId: number
}

type StateAddCredentialEvent = {
  type: 'ADD_CREDENTIAL'
  linkId: number
  credential: ICredential
}
type StateDeleteCredentialEvent = {
  type: 'DELETE_CREDENTIAL'
  credentialId: number
}

export type StateEvent =
  | StateAddTaskEvent
  | StateUpdateTaskEvent
  | StateDeleteTaskEvent
  | StateAddLinkEvent
  | StateDeleteLinkEvent
  | StateAddCredentialEvent
  | StateDeleteCredentialEvent
