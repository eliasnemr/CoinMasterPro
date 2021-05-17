import { ToolsService } from './../../services/tools.service';
import { Decimal } from 'decimal.js';
import { ApiService, app } from './../../services/api.service';
import { SelectedCoins } from './../../tab2/view-coins/view-coins.page';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.page.html',
  styleUrls: ['./aggregate.page.scss', '../../tab2/view-coins/view-coins.page.scss'],
})
export class AggregatePage implements OnInit {

  @ViewChild('confirmBtn', {static: false}) confirmBtn: IonButton;
  selectedCoins: SelectedCoins[];
  tokenid: string;
  totalOutput: any;

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private api: ApiService,
    private tools: ToolsService) {
      this.selectedCoins = this.navParams.get('selectedCoinsArr').selectedCoinsArr; /** Retrieve passed data */
      this.tokenid = this.navParams.get('tokenid'); /** Retrieve passed tokenid */
      this.totalOutput = new Decimal(0);
      this.selectedCoins.forEach(coin => {
        this.totalOutput =
        this.totalOutput.add(new Decimal(coin.amount));
      });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {}

  async aggregateCoins() {
    this.confirmBtn.disabled = true;
    try {
      if (this.selectedCoins.length > 0) {
        const res: any = await this.api.createTransaction(this.tokenid, this.selectedCoins);
        if (res) {
          this.confirmBtn.disabled = false;
          this.modalController.dismiss();
          this.tools.presentToast('Aggregated your coins.', 'primary', 'top');
        } else {
          this.confirmBtn.disabled = false;
          this.tools.presentToast('Transaction failed', 'secondary', 'top');
        }
      } else {
        console.log(app + ': cannot post a transaction with no tokenid or no coinsSelected.');
      }
    } catch (err) {
      this.confirmBtn.disabled = false;
      throw new Error(app + ': posting aggregate transaction failed.');
    }
  }
}
