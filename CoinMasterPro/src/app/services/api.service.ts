import { Injectable } from '@angular/core';
import { Minima, Token } from 'minima';
import { ReplaySubject, Subject } from 'rxjs';

const cryptocurrency = 'Minima';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  $balance: Subject<Token[]>;

  constructor() {
    console.log(cryptocurrency + ' Services started!');
    this.$balance = new ReplaySubject<Token[]>(1);
  }

  set$Balance(bln: Token[]) {
    this.$balance.next(bln);
  }

  getBalance() {
    this.req('balance');
  }

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
