import styles from "./screen.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Screen = () => {
  const refFullwidthImage = React.useRef<HTMLElement | null>(null);
  const refFullwidthImageOverlay = React.useRef<HTMLDivElement | null>(null);
  const refImage = React.useRef<HTMLImageElement | null>(null);

  React.useLayoutEffect(() => {

      if (
        !refFullwidthImage.current ||
        !refImage.current ||
        !refFullwidthImageOverlay.current
      )
        return;

      const ctx = gsap.context(() => {
        gsap.set(refImage.current, {
          scale: 1.3,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: refFullwidthImage.current,
            start: "top top",
            // markers: true,
            end: "+=300% bottom",
            scrub: true,
            pin: true,
          },
        });

        tl.to(refFullwidthImageOverlay.current, {
          opacity: 0.5,
        })
          .to(
            refFullwidthImage.current,
            {
              "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            0
          )
          .to(
            refImage.current,
            {
              scale: 1,
            },
            0
          );

        ScrollTrigger.refresh();

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });

      return () => ctx.revert();

  }, []);

  return (
    <section ref={refFullwidthImage} className={styles.fullwidthImage}>
      <div
        ref={refFullwidthImageOverlay}
        className={styles.fullwidthImageOverlay}
      ></div>
      <div className={styles.fullwidthImageText}>
        <h2>2025 Collection</h2>
        <p>
          Our new collection is everything you need for your next adventure.
          Made to be flexible, breathable and long lasting so you can enjoy more
          of the OutdoorLiving.
        </p>
      </div>
      <img ref={refImage} src="/images/vel.jpg" />
    </section>
  );
};

export default Screen;
