import gsap from "gsap";

export type Animation = "fadeInLeft" | "fadeInUp";

interface RevealAnimateProps {
  element: Element;
  animation?: Animation;
  stagger?: number;
  animateChildren?: boolean;
  observerOptions?: IntersectionObserverInit;
}

export class RevealAnimate {
  private element;
  private animation;
  private stagger;
  private animateChildren;
  private observerOptions;

  private timeline: gsap.core.Timeline;
  private tweenTarget: gsap.TweenTarget;

  constructor({
    element,
    animation = "fadeInLeft",
    stagger = 0,
    observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    },
    animateChildren = false,
  }: RevealAnimateProps) {
    this.element = element;
    this.animation = animation;
    this.stagger = stagger;
    this.animateChildren = animateChildren;
    this.observerOptions = observerOptions;

    this.timeline = gsap.timeline({
      defaults: {
        duration: 1,
        stagger: this.stagger,
      },
    });

    this.tweenTarget = this.animateChildren
      ? this.element.querySelectorAll("&>*")
      : this.element;

    if (!this.element) return;

    this.build();
  }

  private build() {
    if (this.animation.includes("fade")) {
      gsap.set(this.tweenTarget, { opacity: 0 });
    }

    new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        this.init();

        observer.disconnect();
      }
    }, this.observerOptions).observe(this.element);
  }

  private init() {
    switch (this.animation) {
      case "fadeInLeft":
        this.animate("fadeInLeft")();
        break;

      case "fadeInUp":
        this.animate("fadeInUp")();
        break;

      default:
        this.animate("fadeInLeft")();
    }
  }

  // factory fn animate
  private animate(animation: Animation) {
    const animations = {
      fadeInLeft: () =>
        this.timeline.fromTo(
          this.tweenTarget,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0 }
        ),
      fadeInUp: () =>
        this.timeline.fromTo(
          this.tweenTarget,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0 }
        ),
    };

    return animations[animation];
  }
}
