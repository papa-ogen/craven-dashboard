import { ICredential, ILink } from '../types'

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

export const deleteLink = (links: ILink[], linkId: number): ILink[] => {
  const updatedLinks = links.filter(link => link.id !== linkId)

  localStorage.setItem(nameSpace, JSON.stringify(updatedLinks))

  return updatedLinks
}

export const deleteAllLinks = () => {
  localStorage.removeItem(nameSpace)
}

export const addCredential = (
  linkId: number,
  credential: ICredential
): ILink[] => {
  const links = getLinks()
  const updatedLinks = links.map(link => {
    if (link.id === linkId) {
      if (!link.credentials) {
        return {
          ...link,
          credentials: [credential],
        }
      }

      return {
        ...link,
        credentials: [...link.credentials, credential],
      }
    }

    return link
  })

  localStorage.setItem(nameSpace, JSON.stringify(updatedLinks))

  return updatedLinks
}
