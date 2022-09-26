import { createMachine, assign } from 'xstate'
import { ILink, iTask } from '../types'
import { linksSvc, tasksSvc } from '../svc/'

export type StateContext = {
  tasks: iTask[]
  links: ILink[]
}

export type StateAddTaskEvent = {
  type: 'ADD_TASK'
  task: string
}

export type StateUpdateTaskEvent = {
  type: 'UPDATE_TASK'
  task: iTask
}

export type StateEvent = StateAddTaskEvent | StateUpdateTaskEvent

export type TaskService = {
  data: iTask[]
}

export type LinkService = {
  data: ILink[]
}

export type StateService = {
  taskService: TaskService
  linkService: LinkService
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
      tasks: null,
      links: null,
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
            actions: 'updatingTasks',
          },
        },
      },
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
      linkService: async () => {
        return linksSvc.getLinks()
      },
    },
    actions: {
      setTasks: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      updatingTasks: assign({
        tasks: (_, event) => event.data as iTask[],
      }),
      addTask: assign({
        tasks: (context, event) => [...context.tasks, event.data] as iTask[],
      }),
      setLinks: assign({
        links: (_, event) => event.data,
      }),
    },
  }
)

export default machine
