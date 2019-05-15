import { Component, OnInit  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'List of all cats in alphabetical order based on owners gender!';
  catsOfMale: string[];
  catsOfFemale: string[] ;

  constructor(
    private spinner: NgxSpinnerService,
    public peopleService: PeopleService,
  ) { }

    ngOnInit() {
      setTimeout(() => this.spinner.show(), 1);
      this.getPeople();
    }

    getPeople(): void {
      this.peopleService.retrievePeopleData()
      .subscribe(pets => {
        this.spinner.hide();
        this.catsOfMale =  pets['male'];
        this.catsOfFemale = pets['female'] ;
      })
    }
}