interface ICredential {
  id: string;
  name: string;
  descr?: string;
  url?: string[];
  username?: string;
  password?: string;
}

interface ILink {
  title: string;
  expanded?: boolean;
  credentials?: ICredential[];
}

interface IConfig {
  dblinks?: ILink[];
  dbcountdown?: {
    reportDay?: number;
  };
  tasks?: iTask[]
}

interface iTask {
  id: string;
  title: string;
  createdAt: number;
  isCompleted?: boolean;
}

export { ICredential, ILink, IConfig, iTask };
