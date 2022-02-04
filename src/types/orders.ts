export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    createdAt: string;
    name: string;
    number: number;
    updatedAt: string;
  };
  
 export type TWSMessage = {
    orders: Array<TOrder>;
    success: boolean;
    total: number;
    totalToday: number;
  };