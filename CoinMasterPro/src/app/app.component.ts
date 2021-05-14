import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import { Minima } from 'minima';

const app = 'CoinMasterPro';
const cryptocurrency = 'Minima';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private api: ApiService) {
    console.log(app+ ' STARTED!');
    this.initMinima();
  }

  initMinima() {
    Minima.init((msg: any) => {
      if (msg.event === 'connected') {
        this.api.set$Balance(Minima.balance);
      } else if (msg.event === 'newbalance') {
        this.api.set$Balance(msg.info.balance);
      }
    });
  }
}
