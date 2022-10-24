import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useContextMachine } from '../../stateMachine'
import { ILink, LinkTitleColor, colors } from '../../types'

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

const ColorBox = ({ color }: { color: LinkTitleColor }) => {
  const { bg } = linkColorMapper(color)
  console.log(bg)
  return <div className={`w-10 h-10 ${bg}`}></div>
}

const EditLinkTitlePopover = ({ link }: { link: ILink }) => {
  const [, send] = useContextMachine()

  return (
    <Popover className="relative">
      <Popover.Button>
        <h2 className="text-2xl font-extrabold -mb-1 pl-2 group-hover:text-white grow ease-in-out duration-500">
          {link.title}
        </h2>
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
        <Popover.Panel className="absolute left-0 z-10 transform sm:px-0 w-auto bg-gray-800">
          {({ close }) => (
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex p-2 space-x-4">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      close()
                      send('ADD_LINK', { link: { ...link, color } })
                    }}
                  >
                    <ColorBox color={color} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default EditLinkTitlePopover
