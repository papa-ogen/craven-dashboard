import { ILink } from "../types";

const nameSpace = "craven-dashboard-links";

export const getLinks = async (): Promise<ILink[]> => {
  const data = localStorage.getItem(nameSpace);
  const formatedData = data? JSON.parse(data) : []

  return Promise.resolve(formatedData)
};
