import css from './Join.module.css';
import Image from 'next/image';
import JoinLink from './JoinLink';

export default function Join() {
  return (
    <section id="join" className={css.section}>
      <div className="container">
        <div className={css.content}>
          <Image
            className={css.bgImg}
            src="/images/join.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className={css.textBlock}>
            <h2 className={css.title}>
              Приєднуйся до спільноти свідомих мандрівників
            </h2>
            <p className={css.description}>
              Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
              внеском у збереження природи. Тут ти знайдеш однодумців, поради
              для сталих мандрів та натхнення для нових маршрутів Україною.
            </p>
            <JoinLink />
          </div>
        </div>
      </div>
    </section>
  );
}
