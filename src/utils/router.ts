import VueRouter, { Route, Location } from "vue-router";
import { Sandbox, CompilerOptions } from "@/lib/sandbox";
import lzstring from "@/lib/sandbox/vendor/lzstring.min";

export const getRawURLQueryWithCompilerOptions = (
  sandbox: Sandbox,
  route: Route,
  paramOverrides?: any
) => {
  const { query, hash } = getURLQueryWithCompilerOptions(
    sandbox,
    route,
    paramOverrides
  );
  const queryString = Object.entries(query as object)
    .filter(([_k, v]) => Boolean(v))
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");

  const params = queryString.length ? `?${queryString}#${hash}` : `#${hash}`;
  return `${document.location.protocol}//${document.location.host}${document.location.pathname}${params}`;
};

/** Gets a query string representation (hash + queries) */
export const getURLQueryWithCompilerOptions = (
  sandbox: Sandbox,
  route: Route,
  paramOverrides?: any
): Location => {
  const compilerOptions = sandbox.compilerOptions;
  const compilerDefaults = sandbox.getCompilerDefaults();
  const diff = Object.entries(compilerOptions).reduce((acc, [key, value]) => {
    if (value !== compilerDefaults[key]) {
      acc[key] = compilerOptions[key];
    }

    return acc;
  }, {} as Partial<CompilerOptions>);

  // The text of the TS/JS as the hash
  const hash = `code/${lzstring.compressToEncodedURIComponent(
    sandbox.getText()
  )}`;

  let urlParams: Record<string, any> = { ...diff };
  for (const param of ["lib", "ts"]) {
    const params = route.params;
    if (param in params) {
      // Special case the nightly where it uses the TS version to hardcode
      // the nightly build
      if (param === "ts" && params[param] === "Nightly") {
        urlParams["ts"] = sandbox.ts.version;
      } else {
        urlParams["ts"] = params[param];
      }
    }
  }

  // Support sending the selection
  const s = sandbox.editor.getSelection();
  if (
    (s && s.selectionStartLineNumber !== s.positionLineNumber) ||
    (s && s.selectionStartColumn !== s.positionColumn)
  ) {
    urlParams["ssl"] = s.selectionStartLineNumber;
    urlParams["ssc"] = s.selectionStartColumn;
    urlParams["pln"] = s.positionLineNumber;
    urlParams["pc"] = s.positionColumn;
  }

  if (sandbox.config.useJavaScript) urlParams["useJavaScript"] = true;

  if (paramOverrides) {
    urlParams = { ...urlParams, ...paramOverrides };
  }

  return {
    query: urlParams,
    hash
  };
};

/**
 * Loop through all of the entries in the existing compiler options then compare them with the
 * query params and return an object which is the changed settings via the query params
 */
export const getCompilerOptionsFromParams = (
  options: CompilerOptions,
  route: Route
): CompilerOptions => {
  const { query } = route;
  const urlDefaults = Object.keys(options).reduce((acc, key) => {
    if (key in query) {
      const urlValue = query[key];

      if (urlValue === "true") {
        acc[key] = true;
      } else if (urlValue === "false") {
        acc[key] = false;
      } else if (!isNaN(parseInt(urlValue as any, 10))) {
        acc[key] = parseInt(urlValue as any, 10);
      }
    }

    return acc;
  }, {} as CompilerOptions);

  return urlDefaults;
};

// FIXME: not working
export const updateTSVersion = (
  sandbox: Sandbox,
  router: VueRouter,
  version: string
) => {
  const rawURL = getRawURLQueryWithCompilerOptions(sandbox, router.currentRoute, {
    ts: version
  })
  window.location.assign(rawURL)
};
