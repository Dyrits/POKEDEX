export type Shades = {
  primary: string;
  dark: string;
  medium: string;
  light: string;
  background: string;
  white: string;
};

export const Colors: {
  light: Shades;
  dark: Shades;
  type: { [key: string]: string };
} = {
  light: {
    primary: "#DC0A2D",
    dark: "#212121",
    medium: "#666666",
    light: "#E0E0E0",
    background: "#EFEFEF",
    white: "#FFFFFF"
  },
  dark: {
    primary: "#DC0A2D",
    dark: "#212121",
    medium: "#666666",
    light: "#E0E0E0",
    background: "#EFEFEF",
    white: "#FFFFFF"
  },
  type: {
    bug: "#A8B820",
    dark: "#705848",
    dragon: "#6A7BAF",
    electric: "#EFD535",
    fairy: "#F4B1F4",
    fighting: "#A75543",
    fire: "#EA3E0D",
    flying: "#9DAEF7",
    ghost: "#6F5797",
    grass: "#74C442",
    ground: "#D3B357",
    ice: "#9AD6DF",
    normal: "#A0A29F",
    poison: "#B763CF",
    psychic: "#FA65B2",
    rock: "#B9A156",
    steel: "#B5B5C3",
    water: "#539AE2"
  }
};
