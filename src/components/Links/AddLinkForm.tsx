import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'

type AddLinkFormProps = {
  onAddClick?: () => void
}

const AddLinkForm = ({ onAddClick }: AddLinkFormProps) => {
  const [, send] = useContextMachine()

  const [link, setLink] = useState<ILink>({ id: Date.now(), title: '' })

  const onAddLink = () => {
    send('ADD_LINK', { link })

    setLink({ id: Date.now(), title: '' })

    onAddClick && onAddClick()
  }

  return (
    <div>
      <label
        htmlFor="link-title"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Add Link Title
      </label>
      <Input
        id="link-title"
        placeholder="link title"
        onChange={e => setLink({ ...link, title: e.target.value })}
        value={link.title}
      />
      <Button onClick={() => onAddLink()} disabled={!link.title}>
        Add Link
      </Button>
    </div>
  )
}

export default AddLinkForm
