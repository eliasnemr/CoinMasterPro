import { SelectedCoins } from './../tab2/view-coins/view-coins.page';
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
    return this.req('balance');
  }

  getCoinsForToken(tokenid: string) {
    return this.req('coinsimple "' + tokenid + '"');
  }

  getAddress(): Promise<string> {
    return new Promise((resolve) => {
      this.req('newaddress').then((res: any) => {
        if (res.status) {
          resolve(res.response.address.hexaddress);
        } else {
          resolve('');
        }
      });
    });
  }

  async createTransaction(tokenid: string, coinsArr: SelectedCoins[]) {
    const id = Math.floor(Math.random() * 1000000000 );
    const address = await this.getAddress();
    const transaction = {
      id: id,
      inputs: {
        coins: coinsArr
      },
      output: {
        t_id: tokenid,
        addr: address,
        amt: null,
      },
    }
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
