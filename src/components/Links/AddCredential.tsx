import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useContextMachine } from '../../stateMachine'
import { ICredential } from '../../types'

type CredentialInputProps = {
  id: string
  name: string
  credential: ICredential
  setCredential: (credential: ICredential) => void
}

const CredentialInput = ({
  id,
  name,
  credential,
  setCredential,
}: CredentialInputProps) => (
  <div>
    <label
      htmlFor={`credential-${id}`}
      className="block text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {name}
    </label>
    <Input
      id={`credential-${id}`}
      type={id === 'password' ? 'password' : 'text'}
      placeholder={name.toLocaleLowerCase()}
      onChange={e => setCredential({ ...credential, [id]: e.target.value })}
      value={credential && credential[id]}
    />
  </div>
)

const AddCredential = ({ linkId }: { linkId: number }) => {
  const [, send] = useContextMachine()

  const [credential, setCredential] = useState<ICredential>({
    id: Date.now(),
    name: null,
  })

  const onAddCredential = () => {
    send('ADD_CREDENTIAL', { credential, linkId })
    setCredential(null)
  }
  return (
    <div className="max-w-[200px]">
      <h3>Add Credential</h3>
      <CredentialInput
        id="name"
        name="Name"
        credential={credential}
        setCredential={setCredential}
      />
      <CredentialInput
        id="descr"
        name="Description"
        credential={credential}
        setCredential={setCredential}
      />
      {/* <CredentialInput
        id="url"
        name="Url"
        credential={credential}
        setCredential={setCredential}
      /> */}
      <CredentialInput
        id="password"
        name="Password"
        credential={credential}
        setCredential={setCredential}
      />
      <div className="pt-1">
        <Button
          onClick={() => onAddCredential()}
          disabled={!credential || !credential.name}
        >
          Add Credential
        </Button>
      </div>
    </div>
  )
}

export default AddCredential

// type ICredential = {
//   id: string
//   name: string
//   descr?: string
//   url?: string[]
//   username?: string
//   password?: string
// }
