// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.(machine).addingCredential:invocation[0]': {
      type: 'done.invoke.(machine).addingCredential:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).addingLink:invocation[0]': {
      type: 'done.invoke.(machine).addingLink:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).addingTask:invocation[0]': {
      type: 'done.invoke.(machine).addingTask:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).deletingCredential:invocation[0]': {
      type: 'done.invoke.(machine).deletingCredential:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.(machine).deletingLink:invocation[0]': {
      type: 'done.invoke.(machine).deletingLink:invocation[0]'
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
    'error.platform.(machine).addingCredential:invocation[0]': {
      type: 'error.platform.(machine).addingCredential:invocation[0]'
      data: unknown
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    addCredentialService: 'done.invoke.(machine).addingCredential:invocation[0]'
    addLinkService: 'done.invoke.(machine).addingLink:invocation[0]'
    addTaskService: 'done.invoke.(machine).addingTask:invocation[0]'
    deleteCredentialService: 'done.invoke.(machine).deletingCredential:invocation[0]'
    deleteLinkService: 'done.invoke.(machine).deletingLink:invocation[0]'
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
    addCredential: 'done.invoke.(machine).addingCredential:invocation[0]'
    addLink: 'done.invoke.(machine).addingLink:invocation[0]'
    addTask: 'done.invoke.(machine).addingTask:invocation[0]'
    deleteCredential: 'done.invoke.(machine).deletingCredential:invocation[0]'
    deleteLink: 'done.invoke.(machine).deletingLink:invocation[0]'
    deleteTask: 'done.invoke.(machine).deletingTask:invocation[0]'
    setError: 'error.platform.(machine).addingCredential:invocation[0]'
    setLinks: 'done.invoke.(machine).loadingLinks:invocation[0]'
    setTasks: 'done.invoke.(machine).loadingTasks:invocation[0]'
    updateTasks: 'done.invoke.(machine).updatingTasks:invocation[0]'
  }
  eventsCausingServices: {
    addCredentialService: 'ADD_CREDENTIAL'
    addLinkService: 'ADD_LINK'
    addTaskService: 'ADD_TASK'
    deleteCredentialService: 'DELETE_CREDENTIAL'
    deleteLinkService: 'DELETE_LINK'
    deleteTaskService: 'DELETE_TASK'
    linkService: 'done.invoke.(machine).loadingTasks:invocation[0]'
    taskService: 'xstate.init'
    updateTaskService: 'UPDATE_TASK'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'addingCredential'
    | 'addingLink'
    | 'addingTask'
    | 'deletingCredential'
    | 'deletingLink'
    | 'deletingTask'
    | 'error'
    | 'idle'
    | 'loadingLinks'
    | 'loadingTasks'
    | 'updatingTasks'
  tags: never
}
