import Show from '../Show'
import Link from './Link'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'
import { BiSpreadsheet } from 'react-icons/bi'
import Button from '../Button'
import AddLinkPopover from './AddLinkPopover'

const LinkToolbar = () => {
  return (
    <div className="flex gap-2 px-4 pb-2">
      <AddLinkPopover />

      <div>
        <Button onClick={() => console.log('hello')} variant="transparent">
          <div className="flex items-center">
            <BiSpreadsheet />
            <span className="text-xs pl-1">Export config</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

const LinkDistributor = () => {
  const [state] = useContextMachine()
  const { links } = state.context

  const middleIndex = Math.ceil(links.length / 2)

  const firstHalf = [...links].splice(0, middleIndex)
  const secondHalf = [...links].splice(-middleIndex)

  return (
    <Show
      when={links && links.length > 2}
      fallback={
        <ul className="max-w-[600px] min-w-[400px]">
          {links &&
            links.map((link: ILink) => (
              <li key={link.id} className="pb-4">
                <Link key={link.title} link={link} />
              </li>
            ))}
        </ul>
      }
    >
      <div>
        <ul className="max-w-[600px] min-w-[400px]">
          {firstHalf.map(link => (
            <li key={link.id} className="pb-4">
              <Link key={link.title} link={link} />
            </li>
          ))}
        </ul>
        <ul className="max-w-[600px] min-w-[400px]">
          {secondHalf.map(link => (
            <li key={link.id} className="pb-4">
              <Link key={link.title} link={link} />
            </li>
          ))}
        </ul>
      </div>
    </Show>
  )
}

const NoLinksYet = () => {
  return (
    <div className="flex space-y-2 flex-col">
      <p className="text-red pl-2">No links yet</p>
    </div>
  )
}

const Links = () => {
  const [state] = useContextMachine()
  const { links } = state.context

  return (
    <div className="flex space-x-4 flex-col">
      <LinkToolbar />
      <Show when={links && links.length > 0} fallback={<NoLinksYet />}>
        <LinkDistributor />
      </Show>
    </div>
  )
}

export default Links
