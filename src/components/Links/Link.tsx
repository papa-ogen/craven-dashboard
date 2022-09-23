import { ILink } from '../../types'
import LinkTitle from './LinkTitle'
import Credential from './Credential'
import Show from '../Show'

const Link = ({ link }: { link: ILink }) => {
  return (
    <div>
      <LinkTitle title={link.title} />
      <Show
        when={link.credentials.length > 0}
        fallback={<p className="text-red">No credentials</p>}
      >
        <ul>
          {link.credentials.map(credential => (
            <Credential key={credential.id} credential={credential} />
          ))}
        </ul>
      </Show>
    </div>
  )
}

export default Link
