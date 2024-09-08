export default defineEventHandler(async (r) => {
  const path = r.path;
  if (path) {
    if (Array.isArray(path)) {
      if (path.length) {
        const last = path[path.length - 1];
        if (last) {
          if (
            last.includes(".") &&
            !last.endsWith(".mw") &&
            !last.endsWith(".json")
          ) {
            return;
          }
        } else {
          return;
        }
      } else {
        return;
      }
    } else if (path.includes(".")) {
      return;
    }
  }
  return sendRedirect(r, `https://meridiem.markwhen.com${path}`);
});
