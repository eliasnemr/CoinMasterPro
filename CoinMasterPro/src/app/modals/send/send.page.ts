import { ToolsService } from './../../services/tools.service';
import { Decimal } from 'decimal.js';
import { ApiService, app } from './../../services/api.service';
import { SelectedCoins } from './../../tab2/view-coins/view-coins.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NavParams, ModalController, IonButton } from '@ionic/angular';
import { Router } from '@angular/router';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function checkAmount(val: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // console.log(val);
    const a = new Decimal(val);
    if (control.value > a) {
      return {invalidAmount: true};
    }
  };
}

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss', '../aggregate/aggregate.page.scss', '../../tab2/view-coins/view-coins.page.scss'],
})
export class SendPage implements OnInit {

  @ViewChild('confirmBtn', {static: false}) confirmBtn: IonButton;

  sendForm: FormGroup;
  selectedCoins: SelectedCoins[];
  tokenid: string;
  totalOutput: any;

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private api: ApiService,
    private tools: ToolsService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
    this.totalOutput = 0;
    this.selectedCoins = this.navParams.get('selectedCoinsArr').selectedCoinsArr; /** Retrieve passed data */
    this.tokenid = this.navParams.get('tokenid'); /** Retrieve passed tokenid */
    this.totalOutput = new Decimal(0);
    this.selectedCoins.forEach(coin => {
      this.totalOutput =
      this.totalOutput.add(new Decimal(coin.amount));
    });
    this.initForm();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {
    this.route.navigate(['view-coins/'+this.tokenid]);
  }

  initForm() {
    this.sendForm = this.formBuilder.group({
      address: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern('[Mx|0x][a-zA-Z0-9]+')]
      ],
      amount: ['', [Validators.required, checkAmount(this.totalOutput)]]
    });
  }

  resetForm() {
    this.sendForm.reset();
    this.initForm();
  }

  get addressFormItem() {
    return this.sendForm.get('address');
  }

  get amountFormItem() {
    return this.sendForm.get('amount');
  }

  async aggregateCoins() {
    this.confirmBtn.disabled = true;
    try {
      if (this.selectedCoins.length > 0) {
        const res: any =
        await this.api.createTransactionCustom(this.tokenid, this.selectedCoins, this.addressFormItem.value, this.amountFormItem.value);
        if (res) {
          this.confirmBtn.disabled = false;
          this.modalController.dismiss();
          this
            .tools
              .presentToast(
                'Sent your transaction to recipient address: '+
                this.addressFormItem.value.substring(0, 5)+
                '...'+
                this.addressFormItem.value.substring(this.addressFormItem.value.length-2, this.addressFormItem.value.length),
                'primary',
                'top');
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
