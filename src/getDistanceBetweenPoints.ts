interface PointLike {
  x: number;
  y: number;
}

export function getDistanceBetweenPoints(a: PointLike, b: PointLike) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
