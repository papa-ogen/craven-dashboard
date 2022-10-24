import { ILink } from '../../types'
import LinkTitle from './LinkTitle'
import Credential from './Credential'
import Show from '../Show'

const NoCredentialsYet = () => {
  return (
    <div>
      <p className="text-red-600">No credentials</p>
    </div>
  )
}

const Link = ({ link }: { link: ILink }) => {
  return (
    <div>
      <LinkTitle link={link} />
      <Show
        when={!!(link.credentials && link.credentials.length > 0)}
        fallback={<NoCredentialsYet />}
      >
        <ul>
          {link.credentials &&
            link.credentials.map(credential => (
              <Credential
                key={credential.id}
                credential={credential}
                linkId={link.id}
              />
            ))}
        </ul>
      </Show>
    </div>
  )
}

export default Link
