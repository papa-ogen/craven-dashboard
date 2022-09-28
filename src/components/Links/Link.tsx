import { ILink } from '../../types'
import LinkTitle from './LinkTitle'
import Credential from './Credential'
import Show from '../Show'
import AddCredential from './AddCredential'

const NoCredentialsYet = ({ linkId }: { linkId: number }) => {
  return (
    <div>
      <p className="text-red">No credentials</p>
      <AddCredential linkId={linkId} />
    </div>
  )
}

const Link = ({ link }: { link: ILink }) => {
  return (
    <div>
      <LinkTitle link={link} />
      <Show
        when={link.credentials && link.credentials.length > 0}
        fallback={<NoCredentialsYet linkId={link.id} />}
      >
        <ul>
          {link.credentials &&
            link.credentials.map(credential => (
              <Credential key={credential.id} credential={credential} />
            ))}
        </ul>
      </Show>
    </div>
  )
}

export default Link
