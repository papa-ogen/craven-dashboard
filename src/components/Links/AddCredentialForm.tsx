import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useContextMachine } from '../../stateMachine'
import { ICredential, IURL } from '../../types'

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

  const onAddUrl = () => {
    setCredential({ ...credential, url: [...(credential.url || []), url] })
    setUrl({ id: Date.now(), url: '' })
  }

  return (
    <div className="">
      <h3 className="pb-2">Add Credential</h3>
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
      {credential.url &&
        credential.url.map(u => {
          return <p key={u.id}>{u.url}</p>
        })}
      <div className="flex">
        <Input
          id={`credential-url-${credential?.url?.length || 0}`}
          placeholder="url"
          onChange={e => setUrl({ id: Date.now(), url: e.target.value })}
          label="Url"
          value={url && url.url}
        />
        <div className="pl-2">
          <Button onClick={() => onAddUrl()} variant="small" disabled={!url}>
            Add URL
          </Button>
        </div>
      </div>
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
