type ICredential = {
  id: number
  name: string
  descr?: string
  url?: string[]
  username?: string
  password?: string
}

type ILink = {
  id: number
  title: string
  expanded?: boolean
  credentials?: ICredential[]
}

type iTask = {
  id: number
  title: string
  createdAt: number
  isCompleted?: boolean
}

type IConfig = {
  dblinks?: ILink[]
  dbcountdown?: {
    reportDay?: number
  }
  tasks?: iTask[]
}

export { ICredential, ILink, IConfig, iTask }
