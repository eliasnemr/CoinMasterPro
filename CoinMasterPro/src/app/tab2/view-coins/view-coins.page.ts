import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface TokenId {
  id: string
}

@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.page.html',
  styleUrls: ['./view-coins.page.scss'],
})
export class ViewCoinsPage {

  $routerSubscription: Subscription;
  tokenSelected: TokenId;

  constructor(private route: ActivatedRoute) {
    this.$routerSubscription =
    this.route.params.subscribe((res: TokenId) => {
      console.log('Router found tokenId:'+ res.id);
      this.tokenSelected = res;
    });
    console.log('View-Coins-Page called!');
  }

  ionViewWillEnter() {
    console.log('Hello');
  }
}
