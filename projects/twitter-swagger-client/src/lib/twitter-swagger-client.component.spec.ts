import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterSwaggerClientComponent } from './twitter-swagger-client.component';

describe('TwitterSwaggerClientComponent', () => {
  let component: TwitterSwaggerClientComponent;
  let fixture: ComponentFixture<TwitterSwaggerClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterSwaggerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterSwaggerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
