import {
    ArrowIcon,
} from 'components/icons';

export const LinkedInLink = () => {
    return (
        <a
            className="inline-flex items-center flex-row transition-all dark:text-sky hover:opacity-70"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/william-laroche/?locale=en_US"
        >
            <ArrowIcon />
            linked in
        </a>
    )
}

export function ContactParagraph() {
    return (
        <p className="mt-10 font-light text-sm ">
            For questions, inquiries or good old chit-chat, reach out on <LinkedInLink />
        </p>
    )
};