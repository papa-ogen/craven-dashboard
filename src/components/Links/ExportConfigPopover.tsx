import { Popover, Transition } from '@headlessui/react'
import Button from '../Form/Button'
import { Textarea } from 'flowbite-react'
import { Fragment } from 'react'
import { TbDatabaseExport } from 'react-icons/tb'
import { useContextMachine } from '../../stateMachine'
import { ILink, iTask } from 'types'

const ExportConfigPopover = () => {
  const [state] = useContextMachine()
  const { tasks, links }: { tasks: iTask[]; links: ILink[] } = state.context

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center mt-1.5 text-base text-white hover:text-opacity-100 focus:outline-none`}
          >
            <TbDatabaseExport
              title="Export Config"
              className="group-hover:text-yellow-300"
            />
            <span className="text-xs pl-1 group-hover:text-yellow-300">
              Export config
            </span>
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
            <Popover.Panel className="absolute ml-80 left-0 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 w-[800px] bg-gray">
              {({ close }) => (
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative p-7">
                    <Textarea
                      defaultValue={JSON.stringify({ tasks, links }, null, 4)}
                      color="#000000"
                      style={{ height: 400, width: '100%' }}
                    />
                    <div className="pt-2">
                      <Button onClick={() => close()}>Close</Button>
                    </div>
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

export default ExportConfigPopover
