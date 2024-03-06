export default function vector(x, y) {
  const alpha = Math.atan2(y, x);
  return {
    x: Math.cos(alpha),
    y: Math.sin(alpha)
  };
}