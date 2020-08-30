import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api/api.service';
import { AlertService } from '../providers/alert/alert.service';
import { LoaderService } from '../providers/loader/loader.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  newCity = {
    name: '',
    _id: ''
  };

  cities = []

  isLoading = false;
  showForm = false

  constructor(private api: ApiService, private alert: AlertService, private loading: LoaderService) {

  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.loadCities()
  }


  reset() {

    this.newCity = {
      name: '',
      _id: ''
    };

  }


  async loadCities() {

    try {

      this.isLoading = true;

      const resp = await this.api.loadCities();

      if (resp.success && resp.data) {
        this.cities = resp.data;
      }

      this.isLoading = false

    } catch (error) {

      this.isLoading = false
      await this.alert.error(error, 'Oops!');


    }

  }

  async saveCity() {

    if (this.newCity._id) {

      return this.updateCity(this.newCity);

    }

    const loader = await this.loading.show()


    try {

      const resp = await this.api.addCity(this.newCity);

      if (resp.success) {

        this.reset();
        this.showForm = false
        await this.loadCities()
      }

      loader.dismiss()

    } catch (error) {

      loader.dismiss()
      await this.alert.error(error, 'Oops!');


    }

  }

  async updateCity(s) {

    const ack = await this.alert.presentAlertConfirm(`Are you sure you want to update ${s.name}`, 'Are You Sure?', '');

    if (!ack) {

      return;

    }

    const loader = await this.loading.show()

    try {

      if (('active' in s)) {

        s = {
          active: s.active,
          _id: s._id
        }

      } else {

        s = {
          _id: s._id,
          name: s.name
        }

      }

      const resp = await this.api.updateCity(s);

      if (resp.success) {

        this.reset();
        this.showForm = false
        await this.loadCities()
      }

      loader.dismiss()

    } catch (error) {

      loader && loader.dismiss()
      await this.alert.error(error, 'Oops!');


    }

  }

  editCity(c) {

    this.newCity = {
      name: c.name,
      _id: c._id
    };

    this.showForm = true
  }

  async deleteCity(s) {

    let loader = null;


    try {

      const ack = await this.alert.presentAlertConfirm(`Are you sure you want to delete this city`, 'Are You Sure?', '');

      if (!ack) {
        
        return;

      }

      loader = await this.loading.show()

      const resp = await this.api.deleteCity(s._id);

      if (resp.success) {
        await this.loadCities()
      }

      loader.dismiss()

    } catch (error) {

      loader && loader.dismiss()
      await this.alert.error(error, 'Oops!');


    }

  }

}
