import Image from 'next/image';

import css from './About.module.css';

const benefits = [
  {
    title: 'Еко-маршрути по Україні',
    description:
      'Від Карпат до Чорного моря — добірка локацій, де можна подорожувати без шкоди для довкілля.',
  },
  {
    title: 'Практичні екологічні поради',
    description:
      'Дізнайся, як зменшити свій екологічний слід під час мандрів, та зробити подорож комфортною й свідомою.',
  },
];

export default function About() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.content}>
          <div className={css.textBlock}>
            <div className={css.sectionHeader}>
              <h2 className={css.headerTitle}>
                Мандруй екологічно та відкривай нові горизонти
              </h2>

              <p className={css.headerDescription}>
                Наш проєкт створений для тих, хто хоче досліджувати Україну
                відповідально. Ми допоможемо знайти унікальні маршрути, які
                поєднують красу природи, локальну культуру та принципи сталого
                туризму.
              </p>
            </div>

            <ul className={css.benefitsList}>
              {benefits.map(({ title, description }) => (
                <li key={title} className={css.benefitsItem}>
                  <h3 className={css.benefitsTitle}>{title}</h3>
                  <p className={css.benefitsDescription}>{description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={css.imageWrapper}>
            <Image
              className={css.image}
              src="/images/About.webp"
              alt="Зелений ліс з пишними кронами дерев під хмарним небом"
              fill
              sizes="(min-width: 1440px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
