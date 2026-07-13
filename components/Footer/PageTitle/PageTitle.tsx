import styles from './PageTitle.module.css';

interface PageTitleProps {
  title: string;
  className?: string;
}

export default function PageTitle({
  title,
  className = '',
}: PageTitleProps) {
  return (
    <h1 className={`${styles.title} ${className}`.trim()}>
      {title}
    </h1>
  );
}