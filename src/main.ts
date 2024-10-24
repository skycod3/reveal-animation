import "./style.css";

import { RevealAnimate } from "./lib/reveal-animation";
import type { Animation } from "./lib/reveal-animation";

const elementsToAnimate = document.querySelectorAll("[data-reveal-animation]");

if (elementsToAnimate) {
  elementsToAnimate.forEach((element) => {
    // prettier-ignore
    const animation = element.getAttribute("data-reveal-animation") as Animation;
    const stagger = Number(element.getAttribute("data-children-stagger"));
    const animateChildren = element.hasAttribute("data-animate-children");

    new RevealAnimate({ element, animation, stagger, animateChildren });
  });
}
