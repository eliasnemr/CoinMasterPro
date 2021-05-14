import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-coins',
  templateUrl: './view-coins.page.html',
  styleUrls: ['./view-coins.page.scss'],
})
export class ViewCoinsPage implements OnInit {

  constructor() {
    console.log('View-Coins-Page called!')
  }

  ngOnInit() {
  }

}
