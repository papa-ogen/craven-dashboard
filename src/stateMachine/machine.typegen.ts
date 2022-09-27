// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.(machine).addingTask:invocation[0]': {
      type: 'done.invoke.(machine).addingTask:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).deletingTask:invocation[0]': {
      type: 'done.invoke.(machine).deletingTask:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).loadingLinks:invocation[0]': {
      type: 'done.invoke.(machine).loadingLinks:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).loadingTasks:invocation[0]': {
      type: 'done.invoke.(machine).loadingTasks:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).updatingTasks:invocation[0]': {
      type: 'done.invoke.(machine).updatingTasks:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    addTaskService: 'done.invoke.(machine).addingTask:invocation[0]'
    deleteTaskService: 'done.invoke.(machine).deletingTask:invocation[0]'
    linkService: 'done.invoke.(machine).loadingLinks:invocation[0]'
    taskService: 'done.invoke.(machine).loadingTasks:invocation[0]'
    updateTaskService: 'done.invoke.(machine).updatingTasks:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    addTask: 'done.invoke.(machine).addingTask:invocation[0]'
    deleteTask: 'done.invoke.(machine).deletingTask:invocation[0]'
    setLinks: 'done.invoke.(machine).loadingLinks:invocation[0]'
    setTasks: 'done.invoke.(machine).loadingTasks:invocation[0]'
    updateTasks: 'done.invoke.(machine).updatingTasks:invocation[0]'
  }
  eventsCausingServices: {
    addTaskService: 'ADD_TASK'
    deleteTaskService: 'DELETE_TASK'
    linkService: 'done.invoke.(machine).loadingTasks:invocation[0]'
    taskService: 'xstate.init'
    updateTaskService: 'UPDATE_TASK'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'addingTask'
    | 'deletingTask'
    | 'idle'
    | 'loadingLinks'
    | 'loadingTasks'
    | 'updatingTasks'
  tags: never
}
