import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredDashboardComponent } from './stored-dashboard.component';

describe('StoredDashboardComponent', () => {
  let component: StoredDashboardComponent;
  let fixture: ComponentFixture<StoredDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
