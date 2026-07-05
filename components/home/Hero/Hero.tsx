import  css  from "./Hero.module.css"
import Image from 'next/image';

export default function Hero() {
    return (
        <section className={css.hero}>
            <div className="container">
                <div className={css.block}>
                    
                    <div className={css.imagewrap}>
                        <Image src="/images/Hero.webp" fill alt="Hero picture"></Image>
                    </div>
                    <div>
                        <h1 className={css.header}>Відкрий Україну заново — еко-мандри для натхнення</h1>
                        <p className={css.description}>Подорожуй екологічно, відкривай заповідні місця, гори та річки України. Ми зібрали маршрути, які допоможуть побачити красу природи без шкоди для неї.</p>
                        <a href="#join" className={css.button}>Доєднатись до мандрів</a>
                    </div>
                </div>
            </div>
        </section>
    )
}