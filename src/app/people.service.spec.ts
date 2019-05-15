
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PeopleService } from './people.service';

let httpClientSpy: { get: jasmine.Spy };

describe('PeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    expect(service).toBeTruthy();
  });


  it('should return expected pets', () => {
    const expectedResult = {
      male: ['Garfield', 'Tom', 'Nemo'],
      female: ['Sam', 'Max']
    };
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['get']);

    httpClientSpy.get.and.returnValue(of(expectedResult));

    const service: PeopleService = TestBed.get(PeopleService);

    service.retrievePeopleData().subscribe(
      data => expect(data).toEqual(expectedResult, 'expected data'),
      fail
    );
  });

  it('create array of pets from persons', () => {
    const expectedResult = [{
      gender: 'Male',
      pets: [{
        name: 'Max',
        type: 'Dog'
      }]
    }, {
      gender: 'Female',
      pets: [{
        name: 'Simba',
        type: 'Cat'
      }]
    }]
    const service: PeopleService = TestBed.get(PeopleService);
    const result = service._getCatsForMaleFemale(expectedResult);
    expect(typeof result).toEqual('object');
    expect(result).hasOwnProperty('male') ;
    expect(result.male.length).toEqual(0) ;
    expect(result.male).toEqual([]);

    expect(result).hasOwnProperty('female');
    expect(result.female.length).not.toEqual(0);
    expect(result.female[0]).toEqual('Simba');
  });


  it('alphabetical sort by pet name', () => {
    const result = {
      male: ['Garfield', 'Tom', 'Nemo'],
      female: ['Sam', 'Max']
    };
    const service: PeopleService = TestBed.get(PeopleService);
    const expectedResult = service._sortByName(result);

    expect(typeof expectedResult).toEqual('object');
    expect(expectedResult).hasOwnProperty('male');

    const catsArrayMale = expectedResult['male'];
    expect(catsArrayMale[0]).toEqual('Garfield');
    expect(catsArrayMale[1]).toEqual('Nemo');
    expect(catsArrayMale[2]).toEqual('Tom');

    expect(expectedResult).hasOwnProperty('female');
    const catsArrayFemale = expectedResult['female'];
    expect(catsArrayFemale[0]).toEqual('Max');
    expect(catsArrayFemale[1]).toEqual('Sam');
  });

  it('alphabetical sort by pet with similar name', () => {
    const result = {
      male: ['Garfield', 'Tom', 'Nemo'],
      female: ['Sam', 'Max', 'Saa']
    };
    const service: PeopleService = TestBed.get(PeopleService);
    const expectedResult = service._sortByName(result);
console.log(expectedResult);
    expect(typeof expectedResult).toEqual('object');
    expect(expectedResult).hasOwnProperty('male');
    const catsArrayMale = expectedResult['male'];
    expect(catsArrayMale[0]).toEqual('Garfield');
    expect(catsArrayMale[1]).toEqual('Nemo');
    expect(catsArrayMale[2]).toEqual('Tom');

    expect(expectedResult).hasOwnProperty('female');
    const catsArrayFemale = expectedResult['female'];
    expect(catsArrayFemale[0]).toEqual('Max');
    expect(catsArrayFemale[1]).toEqual('Saa');
    expect(catsArrayFemale[2]).toEqual('Sam');
  });

});
