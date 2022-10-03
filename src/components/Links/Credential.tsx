import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { ICredential } from '../../types'
import Input from '../Input'
import Url from './Url'
import Show from '../Show'
import { useState } from 'react'
import EditCredentialdPopover from './EditCredentialPopover'

type CredentialProps = {
  credential: ICredential
  linkId: number
}

const Credential = ({
  credential,
  credential: { id, name, descr, url, username, password },
  linkId,
}: CredentialProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className="border border-black rounded-lg my-2">
      <h3 className="font-bold text-xl bg-gray py-1 px-2 rounded-md rounded-b-none flex hover:bg-opacity-70">
        <span className="grow">{name}</span>
        <EditCredentialdPopover linkId={linkId} credential={credential} />
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

        <Show when={!!(url && url.length > 0)}>
          <ul className="pb-1">
            {url &&
              url.map(u => (
                <li key={u.id}>
                  <Url key={u.id} url={u.url} />
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
