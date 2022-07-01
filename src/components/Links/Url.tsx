const Url = ({ url }: { url: string }) => {
  return (
    <div class="flex pb-2">
      <p class="text-white pr-4">URL</p>
      <a href={url} title={url} target="self" class="text-blue underline truncate max-w-xs">
        {url}
      </a>
    </div>
  );
};

export default Url;
