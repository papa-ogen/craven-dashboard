import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import AddCredential from './AddCredentialForm'

const DashboardPopover = ({ linkId }: { linkId: number }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
          >
            <AiOutlineAppstoreAdd
              title="Add New Credential"
              className="hover:text-green"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 w-96 bg-gray">
              {({ close }) => (
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative p-7">
                    <AddCredential onAddClick={() => close()} linkId={linkId} />
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default DashboardPopover
