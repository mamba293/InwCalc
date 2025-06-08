export function formatPercent(num) {
  const percent = parseFloat(num) / 100;
  const abs = percent < 0 ? -percent : percent;
  if (abs < 1e-6) {
    return percent.toExponential(10);
  } else {
    return parseFloat(percent.toFixed(16)).toString();
  }
}
