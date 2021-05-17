import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as SparkMD5 from 'spark-md5';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(public toastController: ToastController) { }

  createAvatarIcon(tokenId: string) {
    const iconUrl = 'https://www.gravatar.com/avatar/' + SparkMD5.hash(tokenId) + '?d=identicon'; 
    return iconUrl;
  }

  async presentToast(msg: string, clr: string, pos: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message: msg,
      position: pos,
      color: clr,
      duration: 3000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
        }
      ]
    });
    return await toast.present();
  }
}
