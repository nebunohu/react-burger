export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    createdAt: Date;
    name: string;
    number: number;
    updatedAt: Date;
  };
  
 export type TWSMessage = {
    orders: Array<TOrder>;
    success: boolean;
    total: number;
    totalToday: number;
  };