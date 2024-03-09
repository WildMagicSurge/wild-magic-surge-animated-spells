export function fixPath(path) {
  /*
      /prefix/...               =>   ...
      /modules/tokenmagic/...   =>   modules/tokenmagic/...
  */
  if (path) {
    const base = "/modules/tokenmagic";
    const url = new URL(path, window.location.href);

    if (url.origin === window.location.origin) {
      let prefix = "/";

      try {
        if (ROUTE_PREFIX) {
          prefix = new URL(ROUTE_PREFIX, window.location.origin).pathname;
        }
      } catch (err) {}

      path = url.pathname;

      if (prefix === "/") {
        path = path.slice(1);
      } else if (
        path.startsWith(prefix) &&
        (path.length === prefix.length || path[prefix.length] === "/")
      ) {
        path = path.slice(prefix.length + 1);
      } else if (
        path.startsWith(base) &&
        (path.length === base.length || path[base.length] === "/")
      ) {
        path = path.slice(1);
      }
    } else {
      path = url.href;
    }
  }

  return path;
}
