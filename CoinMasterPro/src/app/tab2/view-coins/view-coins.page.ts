import { ToolsService } from './../../services/tools.service';
import { ApiService } from './../../services/api.service';
import { Token } from 'minima';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

interface TokenId {
  tokenId: string
}
interface Coin {
  coin: {
    address: string;
    amount: string;
    coinid: string;
    floating: boolean;
    mxaddress: string;
    storestate: boolean;
    tokenid: string;
  }
  key: string;
  tokenamount: string;
}
export interface SelectedCoins {
  coinid: string;
  amount: string;
}

const cryptocurrency = 'Minima';
@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.page.html',
  styleUrls: ['./view-coins.page.scss'],
})
export class ViewCoinsPage {

  $routerSubscription: Subscription;
  $balanceSubscription: Subscription;
  $coinSubscription: Subscription;
  coins: Coin[];
  token: Token[];
  selectedCoins: Subject<SelectedCoins[]>;
  found: boolean;
  isCoinsFound: boolean;
  tokenSelectedId: TokenId;
  aggregateForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private tools: ToolsService,
    private formBuilder: FormBuilder) {
    this.selectedCoins = new ReplaySubject<SelectedCoins[]>(1);
    /** initialize form */
    this.initForm();
    /** subscribe to router url params */
    this.$routerSubscription =
    this.route.params.subscribe((res: TokenId) => {
      /** subscribe to balance observable */
      this.$balanceSubscription =
      this.api.$balance.subscribe((tokens: Token[]) => {
        this.token = tokens.filter(token => token.tokenid === res.tokenId);
        /** check if found any token matching after filtering */
        if (this.token.length > 0) {
          this.found = true;
          /** get coins for selected token */
          const coins: any =
          this.api.getCoinsForToken(this.token[0].tokenid);
          try {
            if (coins) {
              coins.then((res: any) => {
                const totalCoins = res.response.coins;
                this.coins = totalCoins;
                /** if coins found return true.. */
                if (this.coins.length > 0) {
                  this.isCoinsFound = true;
                  console.log(this.coins);
                /** else.. */
                } else {
                  this.isCoinsFound = false;
                  console.log('No coins found.');
                }
              });

            }
          } catch (err) {
            throw new Error(cryptocurrency + ' : failed to fetch coins.');
          }
          /** create avatar for tokens if no provided icon */
          if (this.token[0].tokenid !== '0x00' && this.token[0].icon === '') {
            this.token[0].icon = this.tools.createAvatarIcon(this.token[0].tokenid);
          }
        
    
        } else {
          this.found = false;
        }

      });
    });
    // console.log('View-Coins-Page called!');
  }

  ionViewWillEnter() {
    // console.log('Hello');
  }

  ionViewWillLeave() {
    this.$routerSubscription.unsubscribe();
    this.$balanceSubscription.unsubscribe();
  }

  initForm() {
    this.aggregateForm = this.formBuilder.group({
      selectedCoinsArr: this.formBuilder.array([], [Validators.required])
    });
  }

  resetForm() {
    this.aggregateForm.reset();
    this.initForm();
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.aggregateForm.get('selectedCoinsArr') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  aggregateCoins() {
    const selected = this.aggregateForm.get('selectedCoinsArr');
    console.log('User selected the following coins to aggregate:');
    console.log(selected.value);
    this.selectedCoins.next(selected.value);

  }

  aggregateCoinsOther() {

  }
}
