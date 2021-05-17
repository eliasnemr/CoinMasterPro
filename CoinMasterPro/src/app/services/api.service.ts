import { Decimal } from 'decimal.js';
import { SelectedCoins } from './../tab2/view-coins/view-coins.page';
import { Injectable } from '@angular/core';
import { Minima, Token } from 'minima';
import { ReplaySubject, Subject } from 'rxjs';

Decimal.set({precision: 64}); /** set precision for Decimal calculations */
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
    console.log('tokenid:'+ tokenid + ' selectedCoins:'+ coinsArr);
    const id = Math.floor(Math.random() * 1000000000);
    const address = await this.getAddress();
    const transaction = {
      txnId: id,
      inputs: {
        coins: coinsArr
      },
      output: {
        tokenId: tokenid,
        addr: address,
        amt: null,
      },
    };

    /** workout aggregating total of inputs */
    let total = new Decimal('0');
    console.log('initTotal: '+ total);
    transaction.inputs.coins.forEach((coin: SelectedCoins) => {
      total = total.add(new Decimal(coin.amount));
    });
    console.log('totalFinish: '+total.toString());
  }

  generateInputText(inputArr: SelectedCoins[]) {
    const inputString = '';
    return new Promise((resolve, reject) => {
      if (inputArr.length > 0) {
        inputArr.forEach(coin => {

        });
      }
    });
  }

  postTransaction(transaction: string) {
    try {
      if (transaction !== '') {
        this.req(transaction).then((res: any) => {
          if (res.status) {
            console.log('Posted!');
          } else {
            console.log('Failed!');
          }
        });
      }
    } catch (err) {
      throw new Error(cryptocurrency + ': cannot post your transaction, something went wrong!');
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
