import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert: AlertController, private toastController: ToastController) { }

  async showDialog(message: any = '', title: any = 'Attention', subTitle: any = '') {

    const alert = await this.alert.create({
      // cssClass: 'my-custom-class',
      header: title,
      subHeader: subTitle,
      message,
      buttons: ['OK']
    });

    await alert.present();

  }

  showWaitDialog(message: any = '', title: any = 'Attention', subTitle: any = '', btn = "OK") {

    return new Promise(async (resolve, reject) => {

      const alert = await this.alert.create({
        // cssClass: 'my-custom-class',
        header: title,
        subHeader: subTitle,
        message,
        buttons: [{

          text: btn,
          handler: () => {
            resolve()
          }

        }]
      });

      await alert.present();

    });

  }

  async error(err, title: any = 'Error', subTitle: any = '') {

    let msg = "something went wrong. please try again"

    if (err && err.error && err.error.message) {

      msg = JSON.stringify(err.error.message)

    } else if (err.message) {

      msg = JSON.stringify(err.message)

    } else if (typeof err === 'string') {

      msg = err

    }

    const alert = await this.alert.create({
      // cssClass: 'my-custom-class',
      header: title,
      subHeader: subTitle,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  presentAlertConfirm(message: any = '', title: any = 'Are You Sure?', subTitle: any = '') {

    return new Promise(async (resolve, reject) => {

      const alert = await this.alert.create({
        // cssClass: 'my-custom-class',
        header: title,
        subHeader: subTitle,
        message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(false)
            }
          }, {
            text: 'Yes',
            handler: () => {
              resolve(true)
            }
          }
        ]
      });

      await alert.present();
    });

  }

  async showToast(message = '', header = '') {
    const toast = await this.toastController.create({
      header,
      message,
      position: 'top',
      animated: true,
      duration: 1500
    });
    toast.present();
  }

}
