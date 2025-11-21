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
  drinkName: "经典温暖特调",
  message: "谦老师，愿您的每一天都像这杯咖啡一样，温暖而醇厚。您的付出如星光般照亮他人。",
  ingredients: ["真诚", "坚持", "温暖的阳光"]
};