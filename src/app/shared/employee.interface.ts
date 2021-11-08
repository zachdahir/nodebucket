/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 10-11-20
 * Description: Employee interface
 */

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
  firstName: string;
}
