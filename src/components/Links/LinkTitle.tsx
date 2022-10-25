import { AiOutlineDelete } from 'react-icons/ai'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'
import Button from '../Form/Button'
import AddCredentialPopover from './AddCredentialPopover'
import EditLinkTitlePopover from './EditLinktitlePopover'
import { linkColorMapper } from './Links.helper'

const Toolbar = ({ linkId }: { linkId: number }) => {
  const [, send] = useContextMachine()

  const onDeleteLink = () => {
    if (confirm('Are you sure you want to delete this link?')) {
      send('DELETE_LINK', { linkId })
    }
  }

  return (
    <div className="flex gap-2">
      <AddCredentialPopover linkId={linkId} />
      <Button onClick={() => onDeleteLink()} variant="transparent">
        <AiOutlineDelete title="Delete Link" className="hover:text-red-600" />
      </Button>
    </div>
  )
}

const LinkTitle = ({ link }: { link: ILink }) => {
  const { border, bg } = linkColorMapper(link.color)

  return (
    <div
      className={`group border-b ${border} flex flex-row items-center mb-2 hover:border-white ease-in-out duration-500`}
    >
      <div
        className={`group w-6 h-6 ${bg} -mb-1 group-hover:bg-white ease-in-out duration-500`}
      ></div>
      <div className="grow">
        <EditLinkTitlePopover link={link} />
      </div>
      <Toolbar linkId={link.id} />
    </div>
  )
}

export default LinkTitle
