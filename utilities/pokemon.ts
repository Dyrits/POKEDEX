export function extractNumber(path: string): number {
  return Number(path.split("/").at(-2));
}

export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getArtwork(number: string | number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ number }.png`;
}