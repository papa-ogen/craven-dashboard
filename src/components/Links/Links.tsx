import { useState } from 'react'
import Show from '../Show'
import Link from './Link'
import AddLinkConfig from './AddLinkConfig'
import AddLink from './AddLink'
import { useContextMachine } from '../../stateMachine'

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
            links.map(link => (
              <li className="pb-4">
                <Link key={link.title} link={link} />
              </li>
            ))}
        </ul>
      }
    >
      <div>
        <ul className="max-w-[600px] min-w-[400px]">
          {firstHalf.map(link => (
            <li className="pb-4">
              <Link key={link.title} link={link} />
            </li>
          ))}
        </ul>
        <ul className="max-w-[600px] min-w-[400px]">
          {secondHalf.map(link => (
            <li className="pb-4">
              <Link key={link.title} link={link} />
            </li>
          ))}
        </ul>
      </div>
    </Show>
  )
}

const NoLinksYet = () => {
  const [state, setState] = useState(0)

  return (
    <div className="flex space-y-2 flex-col">
      <p className="text-red">No links yet</p>
      <div className="space-x-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setState(1)}
        >
          Add config file
        </button>
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setState(2)}
        >
          Add Links
        </button>
      </div>
      {state === 1 && <AddLinkConfig />}
      {state === 2 && <AddLink />}
    </div>
  )
}

const Links = () => {
  const [state] = useContextMachine()
  const { links } = state.context

  return (
    <div className="flex space-x-4">
      <Show when={links && links.length > 0} fallback={<NoLinksYet />}>
        <LinkDistributor />
      </Show>
    </div>
  )
}

export default Links
