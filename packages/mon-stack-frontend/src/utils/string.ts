export const isLastWord = (text: string, word: string): boolean => {
  const words = text.trim().split(/\s+/);
  const lastWord = words[words.length - 1].toLowerCase();
  return [word].includes(lastWord);
};

export const removeLastWord = (text: string): string => {
  const words = text.split(' ');
  words.pop();
  return words.join(' ');
};
