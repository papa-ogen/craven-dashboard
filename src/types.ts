export type IURL = {
  id: number
  url: string
}

export type ICredential = {
  id: number
  name: string
  descr?: string
  url?: IURL[]
  username?: string
  password?: string
  expanded?: boolean
}

export type LinkTitleColor = 'yellow' | 'blue' | 'green' | 'red'

export type ILink = {
  id: number
  title: string
  credentials?: ICredential[]
  color?: LinkTitleColor
}

export type iTask = {
  id: number
  title: string
  createdAt: number
  isCompleted?: boolean
}

export type IConfig = {
  links?: ILink[]
  dbcountdown?: {
    reportDay?: number
  }
  tasks?: iTask[]
  allTimeTasksCount?: number
}
