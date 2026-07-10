import Link from 'next/link';
import css from './MessageNoStories.module.css';

interface MessageNoStoriesProps {
  text: string;
  buttonText: string;
  linkTo: string;
}

export default function MessageNoStories({
  text,
  buttonText,
  linkTo,
}: MessageNoStoriesProps) {
  return (
    <div className={css.wrapper}>
      <p className={css.message}>{text}</p>
      {buttonText && linkTo && (
        <Link href={linkTo} className={css.link}>
          {buttonText}
        </Link>
      )}
    </div>
  );
}
