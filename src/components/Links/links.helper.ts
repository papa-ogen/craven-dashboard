import { LinkTitleColor } from 'types'

export const getLinkColor = (linksCount: number): LinkTitleColor => {
  if (linksCount % 2 === 0) {
    return 'blue'
  } else if (linksCount % 3 === 0) {
    return 'green'
  } else if (linksCount % 4 === 0) {
    return 'red'
  }

  return 'yellow'
}
