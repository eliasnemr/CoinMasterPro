import { ToolsService } from './../services/tools.service';
import { Token } from 'minima';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Subscription } from 'rxjs';

const cryptocurrency = 'Minima';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  myTokens: Token[];
  $balanceSubscription: Subscription;

  constructor(private api: ApiService, private tools: ToolsService) {
    this.myTokens = [];
  }

  ionViewWillEnter() {
    this.$balanceSubscription =
    this.api.$balance.subscribe((tokens: Token[]) => {
      console.log(cryptocurrency + ': balance updated!');
      this.myTokens = tokens;
      this.myTokens.forEach(token => {
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
