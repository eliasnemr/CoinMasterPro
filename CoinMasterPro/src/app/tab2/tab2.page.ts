import { ToolsService } from './../services/tools.service';
import { Token } from 'minima';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Subscription } from 'rxjs';

interface TotalToken extends Token {
  totalCoins: number
}

const cryptocurrency = 'Minima';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  myTokens: TotalToken[] | Token[];
  $balanceSubscription: Subscription;

  constructor(private api: ApiService, private tools: ToolsService) {
    this.myTokens = [];
  }

  ionViewWillEnter() {
    this.$balanceSubscription =
    this.api.$balance.subscribe((tokens: Token[]) => {
      console.log(cryptocurrency + ': balance updated!');
      this.myTokens = tokens;
      this.myTokens.forEach((token: TotalToken) => {
        token.totalCoins = 0;
        const coins: any = this.api.getCoinsForToken(token.tokenid);
        try {
          if (coins) {
            coins.then((res: any) => {
              const totalCoins = res.response.coins.length;
              token.totalCoins = totalCoins;
            });
          }
        } catch (err) {
          throw new Error(cryptocurrency + ': failed to fetch totalCoins!');
        }
        if (token.tokenid !== '0x00' && token.icon === '') {
          token.icon = this.tools.createAvatarIcon(token.tokenid);
        }
      })
    });
  }

  ionViewWillLeave() {
    this.$balanceSubscription.unsubscribe();
  }
}
