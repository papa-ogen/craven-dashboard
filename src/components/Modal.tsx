import { Modal } from 'flowbite-react'
import React from 'react'

type DashboardModalProps = {
  title: string
  onClose: () => void
  show: boolean
  children: React.ReactNode
}

const DashboardModal = ({
  title,
  onClose,
  show,
  children,
}: DashboardModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={onClick}>I accept</Button>
        <Button color="gray" onClick={onClick}>
          Decline
        </Button>
      </Modal.Footer> */}
    </Modal>
  )
}

export default DashboardModal
