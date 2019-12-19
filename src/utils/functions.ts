export function stringStartsWith(
  str1: string,
  str2: string,
  ignore: boolean
): boolean {
  if (str2.length === 0 || str1.length === 0) {
    return true;
  }
  if (ignore) {
    str1 = str1.toString().toLowerCase();
    str2 = str2.toString().toLowerCase();
  }
  for (let i = 0; i < str1.length; i++) {
    if (str1.charAt(i) != str2.charAt(i)) {
      return false;
    }
    if (str2.length - 1 == i) {
      return true;
    }
  }
  return true;
}
