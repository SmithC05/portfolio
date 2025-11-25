// ScrollReveal Hook & Animation Engine
import { useEffect, useRef } from "react";

export const useScrollReveal = (animationClass = "fade-reveal", parallax = false) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.classList.add(animationClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    let parallaxHandler;

    if (parallax) {
      parallaxHandler = () => {
        const rect = element.getBoundingClientRect();
        const offset = rect.top * 0.15;
        element.style.setProperty("--parallax-offset", `${offset}px`);
      };
      window.addEventListener("scroll", parallaxHandler);
    }

    return () => {
      observer.disconnect();
      if (parallax) window.removeEventListener("scroll", parallaxHandler);
    };
  }, [animationClass, parallax]);

  return ref;
};



export const useCinematicScroll = (selector = ".cinematic") => {
useEffect(() => {
const elements = document.querySelectorAll(selector);


const reveal = (el) => {
el.style.opacity = 1;
el.style.transform = "translateY(0px) scale(1)";
};


const hide = (el) => {
el.style.opacity = 0;
el.style.transform = "translateY(50px) scale(0.95)";
};


const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
const el = entry.target;
if (entry.isIntersecting) {
// stagger each child
const children = [...el.children];
children.forEach((child, i) => {
child.style.transition = `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms`;
child.style.opacity = 1;
child.style.transform = "translateY(0) scale(1)";
});
reveal(el);
} else {
hide(el);
[...el.children].forEach((child) => hide(child));
}
});
},
{ threshold: 0.2 }
);


elements.forEach((el) => {
hide(el);
[...el.children].forEach((child) => hide(child));
observer.observe(el);
});


return () => observer.disconnect();
}, [selector]);
};
export const useCinematicChildren = (selector = ".cinematic-children") => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const parent = entry.target;

          if (entry.isIntersecting) {
            const items = parent.querySelectorAll(":scope > *");

            items.forEach((item, index) => {
              item.style.transition = `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`;
              item.style.opacity = 1;
              item.style.transform = "translateY(0) scale(1)";
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((parent) => {
      const items = parent.querySelectorAll(":scope > *");

      items.forEach((item) => {
        item.style.opacity = 0;
        item.style.transform = "translateY(20px) scale(0.98)";
      });

      observer.observe(parent);
    });

    return () => observer.disconnect();
  }, [selector]);
};

