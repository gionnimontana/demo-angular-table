import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonComponent } from './add-button.component';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render delete button when not loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.loading = false;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-icon')).toBeTruthy();
  });

  it('should render spinner on loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.loading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
  });
});
