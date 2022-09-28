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
}

export type ILink = {
  id: number
  title: string
  expanded?: boolean
  credentials?: ICredential[]
}

export type iTask = {
  id: number
  title: string
  createdAt: number
  isCompleted?: boolean
}

export type IConfig = {
  dblinks?: ILink[]
  dbcountdown?: {
    reportDay?: number
  }
  tasks?: iTask[]
}
