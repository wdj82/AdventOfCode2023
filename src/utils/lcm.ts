export function lcm(steps: number[]) {
  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
  const _lcm = (a: number, b: number) => (a * b) / gcd(a, b);
  return steps.reduce((a, b) => _lcm(a, b));
}
