import Show from '../Show'
import Link from './Link'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'
import AddLinkPopover from './AddLinkPopover'
import ExportConfigPopover from './ExportConfigPopover'
import ImportConfigPopover from './ImportConfigPopover'

const LinkToolbar = () => {
  return (
    <div className="flex gap-2 px-4 pb-2 border-b-1 border-white">
      <AddLinkPopover />
      <ExportConfigPopover />
      <ImportConfigPopover />
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
      <ul className="max-w-[600px] min-w-[400px]">
        {links &&
          links.map((link: ILink) => (
            <li key={link.id} className="pb-4">
              <Link key={link.title} link={link} />
            </li>
          ))}
      </ul>
      {/* TODO: Fix bug showing same twice */}
      {/* <div>
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
      </div> */}
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
