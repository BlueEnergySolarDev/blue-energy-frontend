import { useEffect, useRef } from "react";

export const Loading = ({ checking }) => {
  //////Animacion de loading/////
  const div_dot = useRef(null);
  useEffect(() => {
    if (!checking) return;
    let divdotRef = div_dot;
    let cancelled = false;
    const animate = (element, className) => {
      if(element.current){
        element.current.classList.add(className);
      }
      setTimeout(() => {
        if (!cancelled) {
          element.current.classList.remove(className);
          setTimeout(() => {
            animate(element, className);
          }, 500);
        }
      }, 2000);
    };
    animate(divdotRef, "dots--animate");
    return () => {
      if (divdotRef.current === null) {
        cancelled = true;
      }
    };
  }, [checking, div_dot]);
  return (
    <div className="body__loading">
      <h1>
        Loading
        <div ref={div_dot} className="dots">
          <span className="dot z"></span>
          <span className="dot f"></span>
          <span className="dot s"></span>
          <span className="dot t">
            <span className="dot l"></span>
          </span>
        </div>
      </h1>
    </div>
  );
};
