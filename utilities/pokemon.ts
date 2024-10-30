export function URLtoIdentifier(path: string): number {
  return Number(path.split("/").at(-2));
}

export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
