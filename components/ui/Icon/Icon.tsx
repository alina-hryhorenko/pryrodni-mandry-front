type IconProps = {
  name: string;
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
