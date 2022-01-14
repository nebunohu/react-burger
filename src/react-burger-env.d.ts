/// <reference types="react-scripts" />
import { Location } from 'history';

declare type TLocationWithState = Location & {
  state: {from: string};
  pathname: string;
};

export type DATA_TYPE = {
  "_id": string;
  "name": string;
  "type": string;
  "proteins": number;
  "fat": number;
  "carbohydrates": number;
  "calories": number;
  "price": number;
  "image": string;
  "image_mobile": string;
  "image_large": string;
  "__v": number;
};