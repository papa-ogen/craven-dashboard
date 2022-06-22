import { For, Show } from "solid-js";
import { ILink, ICredential } from "../types";

const Input = ({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value?: string;
}) => {
  return (
    <label class="block" for={id}>
      <span class="block text-sm font-medium text-white">{label}</span>
      <input id={id} type="text" value={value} />
    </label>
  );
};

const Url = ({ url }: { url: string }) => {
  return (
    <div class="flex">
      <p class="text-white pr-4">URL</p>
      <a href={url} target="self">
        {url}
      </a>
    </div>
  );
};

const Credential = ({
  credential: { name, descr, url, username, password },
}: {
  credential: ICredential;
}) => {
  return (
    <div class="border border-black rounded-lg my-2">
      <h3 class="font-bold text-xl bg-gray p-1 rounded-md rounded-b-none">
        {name}
      </h3>
      <div class="p-2">
        <p class="pb-1">{descr}</p>
        <Show when={url.length > 0}>
          <ul class="pb-1">
            <For each={url}>
              {(u) => (
                <li>
                  <Url url={u} />
                </li>
              )}
            </For>
          </ul>
        </Show>
        <Show when={username}>
          <Input id={username} label="username" value={username} />
        </Show>
        <Show when={password}>
          <Input id={password} label="password" value={password} />
        </Show>
      </div>
    </div>
  );
};

const LinkTitle = ({ title }: { title: string }) => (
  <div class="border-b border-yellow flex flex-row items-center mb-2">
    <div class="w-6 h-6 bg-yellow -mb-1"></div>
    <h2 class="text-2xl font-extrabold -mb-1 pl-2">{title}</h2>
  </div>
);

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

type LinksProps = {
  links?: ILink[];
};

const Links = ({ links = [] }: LinksProps) => {
  return (
    <div>
      <Show
        when={links.length > 0}
        fallback={<p class="text-red">No links yet</p>}
      >
        <ul class="max-w-[600px]">
          <For each={links}>
            {(link) => (
              <li class="pb-4">
                <Link link={link} />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default Links;
