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

export const linkColorMapper = (
  color?: LinkTitleColor
): { bg: string; border: string } => {
  switch (color) {
    case 'yellow':
      return {
        border: 'border-yellow-300',
        bg: 'bg-yellow-300',
      }
    case 'blue':
      return {
        border: 'border-blue-400',
        bg: 'bg-blue-400',
      }
    case 'red':
      return {
        border: 'border-red-600',
        bg: 'bg-red-600',
      }
    case 'green':
    default:
      return {
        border: 'border-lime-500',
        bg: 'bg-lime-500',
      }
  }
}
