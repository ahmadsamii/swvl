import { Component, OnInit } from '@angular/core';
import { AlertService } from '../providers/alert/alert.service';
import { ApiService } from '../providers/api/api.service';
import { LoaderService } from '../providers/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.page.html',
  styleUrls: ['./add-target.page.scss'],
})
export class AddTargetPage implements OnInit {

  newTarget = {
    name: '',
    promo_ratio: 1,
    atf: 0,
    booking: 0
  }

  ratioOptions = []
  constructor(private alert: AlertService, private api: ApiService, private loading: LoaderService) { }

  ngOnInit() {

    let max = 1;
    let factor = 0.05;

    while (max >= 0) {

      this.ratioOptions.push(max);
      max = +((max - factor).toPrecision(2));

    }

  }


  async saveTarget() {

    const loader = await this.loading.show();

    try {

      const resp = await this.api.addCity(this.newTarget);

      if (resp.success) {

        await this.alert.showDialog('Target Saved successfully');

      }

      loader.dismiss()

    } catch (error) {

      loader && loader.dismiss()
      await this.alert.error(error, 'Oops!');


    }

  }

}
