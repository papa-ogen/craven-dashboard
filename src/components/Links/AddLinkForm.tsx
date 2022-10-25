import { useState } from 'react'
import Input from '../Form/Input'
import Button from '../Form/Button'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'
import { getLinkColor } from './Links.helper'

type AddLinkFormProps = {
  onAddClick?: () => void
}

const AddLinkForm = ({ onAddClick }: AddLinkFormProps) => {
  const [state, send] = useContextMachine()
  const { links }: { links: ILink[] } = state.context
  const totalLinks = links.length

  const [link, setLink] = useState<ILink>({
    id: Date.now(),
    title: '',
    color: getLinkColor(totalLinks),
  })

  const onAddLink = () => {
    send('ADD_LINK', { link })

    setLink({ id: Date.now(), title: '' })

    onAddClick && onAddClick()
  }

  return (
    <div className="bg-gray-900 text-gray-300 p-4">
      <label htmlFor="link-title" className="block mb-2 text-sm font-medium">
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
