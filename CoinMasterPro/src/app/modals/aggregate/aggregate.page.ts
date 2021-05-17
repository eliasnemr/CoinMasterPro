import { ApiService, app } from './../../services/api.service';
import { SelectedCoins } from './../../tab2/view-coins/view-coins.page';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.page.html',
  styleUrls: ['./aggregate.page.scss'],
})
export class AggregatePage implements OnInit {

  selectedCoins: SelectedCoins[];

  constructor(
    private navParams: NavParams,
    private api: ApiService) {
    this.selectedCoins = this.navParams.get('selectedCoinsArr').selectedCoinsArr; /** Retrieve passed data */
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.selectedCoins.forEach(coin => {
      console.log(coin);
    });
  }

  aggregateCoins(tokenid: string) {
    try {
      if (this.selectedCoins.length > 0 && tokenid !== '') {
        this.api.createTransaction(tokenid, this.selectedCoins);
      } else {
        console.log(app + ': cannot post a transaction with no tokenid or no coinsSelected.');
      }
    } catch (err) {
      throw new Error(app + ': posting aggregate transaction failed.');
    }
  }
}
