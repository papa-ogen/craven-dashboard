import { ILink } from '../types'

const nameSpace = 'craven-dashboard-links'

export const getLinks = async (): Promise<ILink[]> => {
  const data = localStorage.getItem(nameSpace)
  const formatedData = data ? JSON.parse(data) : []

  return Promise.resolve(formatedData)
}

export const addLinks = (links: ILink[]): ILink[] => {
  localStorage.setItem(nameSpace, JSON.stringify(links))

  return links
}

export const deleteLinks = () => {
  localStorage.setItem(nameSpace, undefined)
}
