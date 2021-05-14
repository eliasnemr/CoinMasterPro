import { Injectable } from '@angular/core';
import { Minima } from 'minima';

const cryptocurrency = 'Minima';
const app = 'CoinMasterPro'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  req(fnc: any) {
    return new Promise((resolve, reject) => {
      Minima.cmd(fnc, (res: any) => {
        if (res.status) {
          resolve(res);
        } else {
          reject(cryptocurrency+ ': RPC failed when calling: '+fnc+'!');
        }
      });
    });
  }
}
