import { Decimal } from 'decimal.js';
import { SelectedCoins } from './../tab2/view-coins/view-coins.page';
import { Injectable } from '@angular/core';
import { Minima, Token } from 'minima';
import { ReplaySubject, Subject } from 'rxjs';

Decimal.set({precision: 64}); /** set precision for Decimal calculations */
export const cryptocurrency = 'Minima';
export const app = 'CoinMasterPro';
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
    // console.log('tokenid:'+ tokenid + ' selectedCoins:'+ coinsArr);
    const id = Math.floor(Math.random() * 1000000000);
    const address = await this.getAddress(); console.log(app + ':'+ ' address created:' + address);
    const inputString = await this.generateInputText(coinsArr, id); console.log(app + ':'+ ' inputString created:' + inputString);
    /** workout aggregating total of inputs */
    let total = new Decimal('0');
    // console.log('initTotal: '+ total);
    coinsArr.forEach((coin: SelectedCoins) => {
      total = total.add(new Decimal(coin.amount));
    });
    console.log('totalFinish: '+total.toString());
    /** prepare transaction text */
    const transaction =
    'txncreate '   + id + ';' +
     inputString   +
    'txnoutput '   + id + ' ' + total + ' ' + address + ' ' + tokenid + ' ' + 0 + ';' +
    'txnsignauto ' + id + ';' +
    'txnpost '     + id + ';' +
    'txndelete '   + id;
    /** post it.. */
    const result = await this.postTransaction(transaction);
    console.log('RESULT: '+ result);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  generateInputText(inputArr: SelectedCoins[], txnId: number) {
    let inputString = '';
    return new Promise((resolve) => {
      if (inputArr.length > 0) {
        inputArr.forEach((coin, i) => {
          inputString += 'txninput ' + txnId + ' ' + coin.coinid + ' ' + i + ';';
        });
        resolve(inputString);
      } else {
        throw new Error(app + ': generating input text failed!');
      }
    });
  }

  postTransaction(transaction: string) {
    return new Promise((resolve) => {
      try {
        if (transaction !== '') {
          this.req(transaction).then((res: any) => {
            if (Minima.util.checkAllResponses(res)) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      } catch (err) {
        resolve(false);
        throw new Error(cryptocurrency + ': cannot post your transaction, something went wrong!');
      }
    });
  }

  req(fnc: any) {
    return new Promise((resolve, reject) => {
      Minima.cmd(fnc, (res: any) => {
        console.log(res);
        if (Minima.util.checkAllResponses(res)) {
          resolve(res);
        } else {
          reject(cryptocurrency+ ': RPC failed when calling: '+fnc+'!');
        }
      });
    });
  }
}
