import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { PeopleService } from './people.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxSpinnerModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        PeopleService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'List of cats'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('List of all cats in alphabetical order based on owners gender!');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('List of all cats in alphabetical order based on owners gender!');
  });

  it("should call retrievePeopleData and return list of cats of male owners", async(inject([PeopleService], p => {
    const response = {
      male: ['Garfield', 'Tom', 'Nemo'],
      female: ['Sam', 'Max']
    };

    spyOn(p, 'retrievePeopleData').and.returnValue(of(response))

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.catsOfMale).toEqual(response['male']);
    expect(app.catsOfFemale).toEqual(response['female'])
  })));
});
