import { For, Show } from "solid-js";
import { ILink } from "../../types";
import LinkTitle from "./LinkTitle";
import Credential from "./Credential";

const Link = ({ link }: { link: ILink }) => {
  return (
    <div>
      <LinkTitle title={link.title} />
      <Show
        when={link.credentials.length > 0}
        fallback={<p class="text-red">No credentials</p>}
      >
        <ul>
          <For each={link.credentials}>
            {(credential) => <Credential credential={credential} />}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default Link;
