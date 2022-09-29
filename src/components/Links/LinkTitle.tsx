import { useState } from 'react'
import { AiOutlineAppstoreAdd, AiOutlineDelete } from 'react-icons/ai'
import { useContextMachine } from '../../stateMachine'
import { ILink } from '../../types'
import Button from '../Button'
import DashboardModal from '../Modal'
import AddCredential from './AddCredential'

const Toolbar = ({ linkId }: { linkId: number }) => {
  const [, send] = useContextMachine()
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteLink = () => {
    if (confirm('Are you sure you want to delete this link?')) {
      send('DELETE_LINK', { linkId })
    }
  }

  return (
    <div className="flex gap-2">
      <DashboardModal
        title="Add Credential"
        show={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AddCredential linkId={linkId} onAddClick={() => setIsOpen(false)} />
      </DashboardModal>
      <Button onClick={() => setIsOpen(true)} variant="transparent">
        <AiOutlineAppstoreAdd
          title="Add New Credential"
          className="hover:text-green"
        />
      </Button>
      <Button onClick={() => onDeleteLink()} variant="transparent">
        <AiOutlineDelete title="Delete Link" className="hover:text-red" />
      </Button>
    </div>
  )
}

const LinkTitle = ({ link }: { link: ILink }) => (
  <div className="group border-b border-yellow flex flex-row items-center mb-2 hover:border-white">
    <div className="group w-6 h-6 bg-yellow -mb-1 group-hover:bg-white"></div>
    <h2 className="text-2xl font-extrabold -mb-1 pl-2 group-hover:text-white grow">
      {link.title}
    </h2>
    <Toolbar linkId={link.id} />
  </div>
)

export default LinkTitle
