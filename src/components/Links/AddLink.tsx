import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'

const AddLink = () => {
  const [, send] = useContextMachine()

  const [link, setLink] = useState<ILink>({ id: Date.now(), title: null })

  const onAddLink = () => {
    send('ADD_LINK', { ...link })

    setLink({ id: Date.now(), title: null })
  }

  return (
    <div>
      <label
        htmlFor="link-title"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Add Category Title
      </label>
      <Input
        id="link-title"
        placeholder="category title"
        onChange={e => setLink({ ...link, title: e.target.value })}
        value={link.title}
      />
      <Button
        label="Add Category"
        onClick={() => onAddLink()}
        disabled={!link.title}
      />
    </div>
  )
}

export default AddLink

// type ILink = {
//   title: string
//   expanded?: boolean
//   credentials?: ICredential[]
// }
