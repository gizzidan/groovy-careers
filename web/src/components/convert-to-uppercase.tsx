export function TextToUpper(str: string) {
  return str
    .toLowerCase()
    .replace("-", " ")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}