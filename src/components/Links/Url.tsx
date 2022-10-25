const Url = ({ url }: { url: string }) => {
  return (
    <div className="flex pb-2">
      <p className="text-white pr-4">URL</p>
      <a
        href={url}
        title={url}
        target="self"
        className="text-blue underline truncate max-w-xs"
      >
        {url}
      </a>
    </div>
  )
}

export default Url
