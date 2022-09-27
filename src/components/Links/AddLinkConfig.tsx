import { addLinks } from '../../svc/linksSvc'
import { IConfig } from '../../types'

const AddLinkConfig = () => {
  let textarea: HTMLTextAreaElement
  const onAddlinks = () => {
    try {
      const { dblinks } = JSON.parse(textarea.value) as IConfig
      if (dblinks) {
        addLinks(dblinks)
        // setLinks(dblinks)
        return
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col">
      <textarea></textarea>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onAddlinks()}
      >
        Add config file
      </button>
    </div>
  )
}

export default AddLinkConfig
