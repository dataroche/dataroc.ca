import { ArrowIcon } from 'components/icons'

export const LinkedInLink = ({ text }: { text?: string }) => {
  return (
    <a
      className="inline-flex items-baseline flex-row transition-all dark:text-sky hover:opacity-70 no-underline mx-1"
      rel="noopener noreferrer"
      target="_blank"
      href="https://www.linkedin.com/in/william-laroche/?locale=en_US"
    >
      <ArrowIcon />
      {text || 'linked in'}
    </a>
  )
}

export function ContactParagraph() {
  return (
    <div>
      <p className="mt-10 font-light text-sm ">
        For work inquiries or chit-chat, reach out on <LinkedInLink />
      </p>
    </div>
  )
}
