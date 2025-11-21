import { CoffeeOption, MoodType, BrewResult } from './types';

export const APP_TITLE = "谦老师的温暖特调";
export const APP_SUBTITLE = "The Warmth Brew";

export const COFFEE_MENU: CoffeeOption[] = [
  {
    id: MoodType.COMFORT,
    label: "治愈拿铁",
    description: "温润绵长，抚平疲惫",
    icon: "☕️"
  },
  {
    id: MoodType.ENERGY,
    label: "活力美式",
    description: "清醒坚定，注入力量",
    icon: "⚡️"
  },
  {
    id: MoodType.GRATITUDE,
    label: "感恩焦糖",
    description: "甜蜜回甘，心怀暖意",
    icon: "🙏"
  },
  {
    id: MoodType.POETIC,
    label: "诗意手冲",
    description: "细腻独到，如沐春风",
    icon: "🍃"
  }
];

export const FALLBACK_MESSAGE: BrewResult = {
  drinkName: "星光元气特调",
  message: "亲爱的谦老师，奋斗的路上辛苦啦！愿这杯咖啡像温暖的拥抱，抚平你所有的疲惫。记得在追逐梦想的同时，也要照顾好那个可爱的自己，你闪闪发光的样子真的很美。",
  ingredients: ["100%的努力", "不服输的可爱", "璀璨星光"]
};