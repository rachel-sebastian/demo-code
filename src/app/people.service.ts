import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_BASE_URL } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) { }

  public retrievePeopleData(): Observable<any> {
    return this.http.get(APP_BASE_URL)
      .pipe(map(people => {
        const petsByGender = this._getCatsForMaleFemale(people);
        return this._sortByName(petsByGender);
      }, error => {
        console.log('PeopleService:: retrievePeopleData :: Error' + JSON.stringify(error));
      }));
  }

  _getCatsForMaleFemale(people) {
    if (people === undefined) return
    return people
      .filter(item => ['male', 'female'].indexOf(item.gender.toLowerCase()) >= 0)
      .reduce((petsByGender, item) => {
        const key = item.gender.toLowerCase()
        petsByGender[key] = petsByGender[key].concat(
          (item.pets || []).filter(pet => pet.type === 'Cat')
            .map(pet => pet.name)
        )
        return petsByGender
      }, {
        male: [],
        female: []
      })

  }

  _sortByName(data) {
    if (data == undefined) return
    return Object.keys(data).reduce((object, key) => {
      object[key] = (data[key] || []).sort()
      return object;
    }, {})
  }
}
