import { IVeg } from "./vegetableInterface";
import { IUser } from "./userInterface";

export interface IOrder {
  id: number;
  customer: number | IUser;
  vendor: number | IUser;
  vegetable: number | IVeg;
  quantity: number;
  price: number;
  date: string;
}
