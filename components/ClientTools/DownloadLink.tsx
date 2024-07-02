import { useClientToolsStore } from 'hooks/useClientToolsStore'

export const DownloadLink = ({ className = '' }) => {
  const { pdfDownloadLink } = useClientToolsStore()

  console.log(pdfDownloadLink)

  return (
    <div className={`text-13 leading-120 md:text-14 ${className}`}>
      <a
        href={pdfDownloadLink}
        download="am-mood-board.pdf"
        className="underline-offset-3 underline"
      >
        Download PDF
      </a>
    </div>
  )
}
