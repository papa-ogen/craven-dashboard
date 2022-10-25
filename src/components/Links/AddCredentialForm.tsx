import { useState } from 'react'
import Input from '../Form/Input'
import Button from '../Form/Button'
import { useContextMachine } from '../../stateMachine'
import { ICredential, IURL } from '../../types'
import { AiOutlineDelete } from 'react-icons/ai'

const CredentialUrl = ({
  url,
  onDeleteClick,
  onUrlChange,
}: {
  url: IURL
  onDeleteClick: (urlId: number) => void
  onUrlChange: (url: IURL) => void
}) => {
  const onDelete = () => {
    onDeleteClick(url.id)
  }

  const onUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUrlChange({ ...url, url: e.target.value })
  }
  return (
    <div key={url.id} className="flex text-base font-light">
      <div className="grow">
        <Input id={url.id.toString()} value={url.url} onChange={onUrl} />
      </div>
      <div className="px-2 flex items-center">
        <Button onClick={() => onDelete()} variant="transparent">
          <AiOutlineDelete title="Delete Link" className="hover:text-red-600" />
        </Button>
      </div>
    </div>
  )
}

const AddCredentialForm = ({
  linkId,
  onAddClick,
  credential: storedCredential,
}: {
  linkId: number
  onAddClick?: () => void
  credential?: ICredential
}) => {
  const [, send] = useContextMachine()
  const defaultCredentials = storedCredential || {
    id: Date.now(),
    name: '',
  }

  const [credential, setCredential] = useState<ICredential>(defaultCredentials)
  const [url, setUrl] = useState<IURL>({ id: Date.now(), url: '' })

  const onAddCredential = () => {
    send('ADD_CREDENTIAL', { credential, linkId })

    // reset
    setCredential({
      id: Date.now(),
      name: '',
    })

    onAddClick && onAddClick()
  }

  const onDelete = (urlId: number) => {
    const credentialUrls = credential.url?.filter(u => u.id !== urlId)
    send('ADD_CREDENTIAL', {
      credential: { ...credential, url: credentialUrls },
      linkId,
    })
    setCredential({ ...credential, url: credentialUrls })
  }

  const onAddUrl = () => {
    setCredential({ ...credential, url: [...(credential.url || []), url] })
    setUrl({ id: Date.now(), url: '' })
    send('ADD_CREDENTIAL', {
      credential: { ...credential, url: [...(credential.url || []), url] },
      linkId,
    })
  }

  const onEditUrl = (url: IURL) => {
    const credentialUrls = credential.url?.map(u => {
      if (u.id === url.id) return url

      return u
    })

    send('ADD_CREDENTIAL', {
      credential: { ...credential, url: credentialUrls },
      linkId,
    })
    setCredential({ ...credential, url: credentialUrls })
  }

  return (
    <div className="font-normal ">
      <h3 className="pb-2 text-base">
        {storedCredential ? 'Edit Credential' : 'Add Credential'}
      </h3>
      <Input
        id={`credential-name`}
        placeholder="name"
        onChange={e => setCredential({ ...credential, name: e.target.value })}
        label="Name"
        value={credential && credential.name}
      />
      <Input
        id={`credential-descr`}
        placeholder="description"
        onChange={e => setCredential({ ...credential, descr: e.target.value })}
        label="Description"
        value={credential && credential.descr}
      />
      <hr className="pb-1" />
      <div className="flex pb-1 items-center">
        <Input
          id={`credential-url-${credential?.url?.length || 0}`}
          placeholder="url"
          onChange={e => setUrl({ id: Date.now(), url: e.target.value })}
          label="Url"
          value={url && url.url}
        />
        <div className="flex pl-2 w-[90px] items-end place-content-end">
          <Button onClick={() => onAddUrl()} variant="small" disabled={!url}>
            Add URL
          </Button>
        </div>
      </div>
      {credential.url &&
        credential.url.map(u => {
          return (
            <CredentialUrl
              key={u.id}
              url={u}
              onDeleteClick={onDelete}
              onUrlChange={onEditUrl}
            />
          )
        })}
      <hr className="pb-1" />
      <Input
        id={`credential-username`}
        placeholder="username"
        onChange={e =>
          setCredential({ ...credential, username: e.target.value })
        }
        label="Username"
        value={credential && credential.username}
      />
      <Input
        id={`credential-password`}
        placeholder="password"
        onChange={e =>
          setCredential({ ...credential, password: e.target.value })
        }
        label="Password"
        value={credential && credential.password}
        type="password"
      />
      <div className="pt-1">
        <Button
          onClick={() => onAddCredential()}
          disabled={!credential || !credential.name}
        >
          {`${storedCredential ? 'Edit Credential' : 'Add Credential'}`}
        </Button>
      </div>
    </div>
  )
}

export default AddCredentialForm
