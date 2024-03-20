export const convertDate = (date: Date): string => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString("en-US", options as any);
};
