export const shortenText = (text: string, maxLength: number) => {
  const shortenedText =
    text?.length > maxLength ? text?.substring(0, maxLength) + "..." : text;
  return shortenedText;
};
