import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loading:LoadingController) {

   }

  async show(message="please wait..."){

    const loading = await this.loading.create({
      message,
    });

    await loading.present();

    return loading;
  
  }
}
