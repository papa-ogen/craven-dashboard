import { AiOutlineDelete } from 'react-icons/ai'
import { useContextMachine } from '../../stateMachine'
import { ILink, LinkTitleColor } from '../../types'
import Button from '../Form/Button'
import AddCredentialPopover from './AddCredentialPopover'
import EditLinkTitlePopover from './EditLinktitlePopover'

const linkColorMapper = (
  color?: LinkTitleColor
): { bg: string; border: string } => {
  switch (color) {
    case 'yellow':
      return {
        border: 'border-yellow-300',
        bg: 'bg-yellow-300',
      }
    case 'blue':
      return {
        border: 'border-blue-400',
        bg: 'bg-blue-400',
      }
    case 'red':
      return {
        border: 'border-red-600',
        bg: 'bg-red-600',
      }
    case 'green':
    default:
      return {
        border: 'border-lime-500',
        bg: 'bg-lime-500',
      }
  }
}

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
