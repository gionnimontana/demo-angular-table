import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonComponent } from './delete-button.component';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
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
