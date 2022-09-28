import { ILink, iTask } from '../types'

export type TaskService = {
  data: iTask[]
}

export type LinkService = {
  data: ILink[]
}

export type CredentialService = {
  data: ILink[]
}

export type StateService = {
  taskService: TaskService
  addTaskService: TaskService
  updateTaskService: TaskService
  deleteTaskService: TaskService
  linkService: LinkService
  addLinkService: LinkService
  deleteLinkService: LinkService
  addCredentialService: CredentialService
}
