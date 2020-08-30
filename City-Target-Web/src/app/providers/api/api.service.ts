import { RestService } from './../rest/rest.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private rest: RestService) { }

  //Cities

  addCity(data) {
    return this.rest.post(`city`, data)
  }

  loadCities() {
    return this.rest.get('city', {})
  }

  updateCity(data) {
    return this.rest.put('city', data)
  }

  deleteCity(id) {
    return this.rest.delete(`city/${id}`, {})
  }

  //Targets

  addTarget(data) {
    return this.rest.post(`target`, data)
  }

  loadTargets(city = "") {
    return this.rest.get('target', { city })
  }

  updateTarget(data) {
    return this.rest.put('target', data)
  }

  deleteTarget(id) {
    return this.rest.delete(`target/${id}`, {})
  }


}
