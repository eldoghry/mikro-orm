export function convertToSlug(text: string) {
  const suffix = '-' + `${Date.now()}`.slice(-4);
  console.log(suffix);
  return (
    text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + suffix
  );
}
