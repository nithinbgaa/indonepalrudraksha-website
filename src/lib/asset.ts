/**
 * Prefix a /public path with the deploy base path. GitHub Pages serves the site under
 * /<repo>/, and plain <img src> / string paths don't get Next's basePath added automatically.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
