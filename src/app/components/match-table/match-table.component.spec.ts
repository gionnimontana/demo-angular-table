import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MatchTableComponent } from './match-table.component';

describe('MatchTableComponent', () => {
  let component: MatchTableComponent;
  let fixture: ComponentFixture<MatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner on init', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#match_table_wrapper')?.firstChild?.nodeName).toEqual('MAT-SPINNER');
  });

  it('should render table component after updateTabled method dispatched', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    await component.updateTable();
    fixture.detectChanges();
    expect(compiled.querySelector('#match_table_wrapper')?.firstChild?.nodeName).toEqual('TABLE');
  });

  it('table should remove one row after a successful deleteMatch call', async () => {
    await component.updateTable();
    const previousRowLength = component.dataSource.length;
    await component.deleteMatch(component.dataSource[0].id);
    const currentRowLength = component.dataSource.length;
    expect(currentRowLength).toEqual(previousRowLength - 1);
  });

  it('table should add one row after a successful addMatch call', async () => {
    await component.updateTable();
    const previousRowLength = component.dataSource.length;
    await component.addMatch();
    const currentRowLength = component.dataSource.length;
    expect(currentRowLength).toEqual(previousRowLength + 1);
  });
  
});
