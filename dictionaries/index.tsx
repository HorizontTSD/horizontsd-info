export const dictionaries: any = {
  [`en-US`]: () => import("./en-US.json").then((module) => module.default),
  [`ru-RU`]: () => import("./ru-RU.json").then((module) => module.default),
  [`it-IT`]: () => import("./it-IT.json").then((module) => module.default)
};

export function getDictionary(locale: string) {
  return dictionaries[locale]?.() ?? dictionaries[`ru-RU`]();
}
