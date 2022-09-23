import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { ICredential } from '../../types'
import Input from '../Input'
import Url from './Url'
import Show from '../Show'
import { useState } from 'react'

const Credential = ({
  credential: { id, name, descr, url, username, password },
}: {
  credential: ICredential
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className="border border-black rounded-lg my-2">
      <h3 className="font-bold text-xl bg-gray py-1 px-2 rounded-md rounded-b-none flex hover:bg-opacity-70">
        <span className="grow">{name}</span>
        <button onClick={() => onToggle()}>
          {isOpen ? (
            <BsChevronUp className="color-white text-lg" />
          ) : (
            <BsChevronDown className="color-white text-lg" />
          )}
        </button>
      </h3>
      <div className={`p-2${!isOpen ? ' hidden' : ''}`}>
        <p className="pb-1">{descr}</p>
        <Show when={url.length > 0}>
          <ul className="pb-1">
            {url.map(u => (
              <li>
                <Url key={u} url={u} />
              </li>
            ))}
          </ul>
        </Show>
        <Show when={!!username}>
          <Input id={`${id}-username`} label="username" value={username} />
        </Show>
        <Show when={!!password}>
          <Input
            id={`${id}-password`}
            label="password"
            value={password}
            type="password"
          />
        </Show>
      </div>
    </li>
  )
}

export default Credential
