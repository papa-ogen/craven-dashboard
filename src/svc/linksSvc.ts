import { ILink } from '../types'

const nameSpace = 'craven-dashboard-links'

export const getLinks = (): ILink[] => {
  const data = localStorage.getItem(nameSpace)

  return data ? JSON.parse(data) : []
}

export const addLinks = (links: ILink[]): ILink[] => {
  localStorage.setItem(nameSpace, JSON.stringify(links))

  return links
}
export const addLink = (link: ILink): ILink[] => {
  const links = getLinks()
  const updatedLinks = [...links, link]
  localStorage.setItem(nameSpace, JSON.stringify(updatedLinks))

  return updatedLinks
}

export const deleteLinks = () => {
  localStorage.setItem(nameSpace, undefined)
}
