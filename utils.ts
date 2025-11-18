export function createPageUrl(pageName: string): string {
  if (!pageName) return "/";

  const [name, query] = pageName.split("?");
  const slug = name.toLowerCase() === "home" ? "" : name.toLowerCase();
  const path = `/${slug}`.replace(/\/+$/, "") || "/";

  return query ? `${path}?${query}` : path;
}
