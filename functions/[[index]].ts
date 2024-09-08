export const onRequest: PagesFunction<{}, "index"> = async (context) => {
  const path = context.params.index;
  if (!path) {
    return context.next();
  }
  const isArray = Array.isArray(path);
  if (isArray) {
    if (path.length) {
      const last = path[path.length - 1];
      if (last) {
        if (
          last.includes(".") &&
          !last.endsWith(".mw") &&
          !last.endsWith(".json")
        ) {
          return context.next();
        }
      } else {
        return context.next();
      }
    } else {
      return context.next();
    }
  } else if (path.includes(".")) {
    return context.next();
  }
  return Response.redirect(
    `https://meridiem.markwhen.com/${isArray ? path.join("/") : path}`
  );
};
