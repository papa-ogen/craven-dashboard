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
  dblinks: ILink[];
  dbcountdown?: {
    reportDay?: number;
  };
}

export { ICredential, ILink, IConfig };
