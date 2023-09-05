
import { moment } from "obsidian";
import en from "./locale/en";
import zhCN from "./locale/zh-cn";

const localeMap: { [k: string]: Partial<typeof en> } = {
  en,
  "zh-cn": zhCN,
};
const locale = localeMap[moment.locale()];

export function t(str: keyof typeof en): string {
  if (!locale) {
    console.error({
        plugin: "Translate",
        where: "helpers.t",
        message: "Error: Translate locale not found",
        locale: moment.locale(),
    })
  }

  return (locale && locale[str]) || en[str];
}