import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTargetPage } from './add-target.page';

describe('AddTargetPage', () => {
  let component: AddTargetPage;
  let fixture: ComponentFixture<AddTargetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTargetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTargetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
