import { LinkTitleColor } from 'types'
import { getLinkColor } from './links.helper'

describe('Link helpers', () => {
  it('should return link title, new color every x of total colors', () => {
    const givenLinkCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const expectedLinkColor: LinkTitleColor[] = [
      'yellow',
      'blue',
      'green',
      'blue',
      'yellow',
      'blue',
      'yellow',
      'blue',
      'green',
      'blue',
      'yellow',
    ]

    givenLinkCounts.forEach((linkCount, i) => {
      console.log(linkCount)
      expect(getLinkColor(linkCount)).toBe(expectedLinkColor[i])
    })
  })
})
