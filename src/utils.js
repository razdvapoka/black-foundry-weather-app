export const range = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start) / step) }, (v, i) => i * step + start);

export const cc = (...classNames) => classNames.join(" ");

export const withClass = givenClassName => Component => ({ className, ...props }) => (
  <Component className={cc(givenClassName, className)} {...props} />
);

export const cToF = c => Math.round(c * 1.8 + 32);
export const tempToStr = (temperature, isFahrenheitOn) =>
  isFahrenheitOn ? `${cToF(temperature)}°F` : `${temperature}°C`;

export const easeInOutQuad = (t, b, c, d) => {
  if ((t /= d / 2) < 1) {
    return (c / 2) * t * t + b;
  } else {
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }
};
