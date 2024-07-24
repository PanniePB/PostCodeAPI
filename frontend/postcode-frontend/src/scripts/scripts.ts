const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const convertUndefinedToNull = (
  obj: Record<string, any>
): Record<string, any> => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // If the property is an object (and not null), recursively process items in that object
      obj[key] = convertUndefinedToNull(obj[key]);
    } else if (obj[key] === undefined) {
      // Convert undefined to null
      obj[key] = null;
    }
  }
  return obj;
};

export default {
  toDateString,
  convertUndefinedToNull,
};
