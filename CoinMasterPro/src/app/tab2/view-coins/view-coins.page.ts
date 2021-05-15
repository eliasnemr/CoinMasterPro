import { ApiService } from './../../services/api.service';
import { Token } from 'minima';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface TokenId {
  tokenId: string
}

@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.page.html',
  styleUrls: ['./view-coins.page.scss'],
})
export class ViewCoinsPage {

  $routerSubscription: Subscription;
  $balanceSubscription: Subscription;
  token: Token[];
  found: boolean;
  tokenSelectedId: TokenId;
  
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.$routerSubscription =
    this.route.params.subscribe((res: TokenId) => {
      this.$balanceSubscription =
      this.api.$balance.subscribe((tokens: Token[]) => {
        this.token = tokens.filter(token => token.tokenid === res.tokenId);

        if (this.token.length > 0) {
          this.found = true;
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
}
