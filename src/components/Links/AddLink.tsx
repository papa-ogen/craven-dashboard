import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useContextMachine } from '../../stateMachine'

const AddLink = () => {
  const [, send] = useContextMachine()

  const [title, setTitle] = useState(null)

  const onAddLink = () => {
    send('ADD_LINK', { title })
    setTitle(null)
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
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <Button
        label="Add Category"
        onClick={() => onAddLink()}
        disabled={!title}
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
