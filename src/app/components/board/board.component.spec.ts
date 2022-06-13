import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let cells = document.querySelectorAll('.board__cell');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 9 (10) divs of cells', () => {
    let len = fixture.debugElement.queryAll(By.css('.board__cell')).length;
    fixture.detectChanges();
    expect(len).toBe(9);
  });

  it('should create 9 (10) divs of cells', () => {
    component.initializeVariables();
    let cells = fixture.nativeElement.querySelectorAll('.board__cell');
    component.cellClick(cells[0], 0);
    fixture.detectChanges();
  });
});
