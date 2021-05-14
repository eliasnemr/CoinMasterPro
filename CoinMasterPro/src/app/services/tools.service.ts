import { Injectable } from '@angular/core';
import * as SparkMD5 from 'spark-md5';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  createAvatarIcon(tokenId: string) {
    const iconUrl = 'https://www.gravatar.com/avatar/' + SparkMD5.hash(tokenId) + '?d=identicon'; 
    return iconUrl;
  }
}
