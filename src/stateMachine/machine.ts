import { createMachine, assign } from 'xstate'
import { ILink, iTask } from '../types'
import { linksSvc, tasksSvc } from '../svc/'
import { StateEvent } from './events.type'
import { StateService } from './service.type'

export type StateContext = {
  tasks: iTask[]
  links: ILink[]
  error: unknown
}

const machine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as StateContext,
      events: {} as StateEvent,
      services: {} as StateService,
    },
    initial: 'loadingTasks',
    context: {
      tasks: [],
      links: [],
      error: null,
    },
    states: {
      idle: {
        on: {
          ADD_TASK: {
            target: 'addingTask',
          },
          UPDATE_TASK: {
            target: 'updatingTasks',
          },
          DELETE_TASK: {
            target: 'deletingTask',
          },
          ADD_LINK: {
            target: 'addingLink',
          },
          DELETE_LINK: {
            target: 'deletingLink',
          },
          ADD_CREDENTIAL: {
            target: 'addingCredential',
          },
          DELETE_CREDENTIAL: {
            target: 'deletingCredential',
          },
        },
      },
      loadingTasks: {
        invoke: {
          src: 'taskService',
          onDone: {
            target: 'loadingLinks',
            actions: 'setTasks',
          },
        },
      },
      loadingLinks: {
        invoke: {
          src: 'linkService',
          onDone: {
            target: 'idle',
            actions: 'setLinks',
          },
        },
      },
      addingTask: {
        invoke: {
          src: 'addTaskService',
          onDone: {
            target: 'idle',
            actions: 'addTask',
          },
        },
      },
      updatingTasks: {
        invoke: {
          src: 'updateTaskService',
          onDone: {
            target: 'idle',
            actions: 'updateTasks',
          },
        },
      },
      deletingTask: {
        invoke: {
          src: 'deleteTaskService',
          onDone: {
            target: 'idle',
            actions: 'deleteTask',
          },
        },
      },
      addingLink: {
        invoke: {
          src: 'addLinkService',
          onDone: {
            target: 'idle',
            actions: 'addLink',
          },
        },
      },
      deletingLink: {
        invoke: {
          src: 'deleteLinkService',
          onDone: {
            target: 'idle',
            actions: 'deleteLink',
          },
        },
      },
      addingCredential: {
        invoke: {
          src: 'addCredentialService',
          onDone: {
            target: 'idle',
            actions: 'addCredential',
          },
          onError: {
            target: 'error',
            actions: 'setError',
          },
        },
      },
      deletingCredential: {
        invoke: {
          src: 'deleteCredentialService',
          onDone: {
            target: 'idle',
            actions: 'deleteCredential',
          },
        },
      },
      error: {},
    },
  },
  {
    services: {
      taskService: async () => {
        return tasksSvc.getTasks()
      },
      addTaskService: async (_, event) => {
        return tasksSvc.addTask(event.task)
      },
      updateTaskService: async (_, event) => {
        return tasksSvc.updateTask(event.task)
      },
      deleteTaskService: async (_, event) => {
        return tasksSvc.deleteTask(event.id)
      },
      linkService: async () => {
        return linksSvc.getLinks()
      },
      addLinkService: async (_, event) => {
        return linksSvc.addLink(event.link)
      },
      deleteLinkService: async ({ links }, { linkId }) => {
        return linksSvc.deleteLink(links, linkId)
      },
      addCredentialService: async (_, { linkId, credential }) => {
        return linksSvc.addCredential(linkId, credential)
      },
      deleteCredentialService: async ({ links }, { credentialId }) => {
        return linksSvc.deleteCredential(links, credentialId)
      },
    },
    actions: {
      setTasks: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      updateTasks: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      addTask: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      deleteTask: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      setLinks: assign({
        links: (_, event) => event.data,
      }),
      addLink: assign({
        links: (_, event) => event.data as ILink[],
      }),
      deleteLink: assign({
        links: (_, event) => event.data as ILink[],
      }),
      addCredential: assign({
        links: (_, event) => event.data as ILink[],
      }),
      deleteCredential: assign({
        links: (_, event) => event.data as ILink[],
      }),
      setError: assign({
        error: (_, event) => event.toString() as unknown,
      }),
    },
  }
)

export default machine
