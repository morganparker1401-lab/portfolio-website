/** Resolves a file in public/ against the configured base URL. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const navLinks = [
  ['home', 'Home'],
  ['storytelling', 'Brand storytelling'],
  ['work', 'Featured work'],
  ['about', 'About me'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
] as const
