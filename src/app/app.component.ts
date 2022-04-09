import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tic-tac-toe';
  items: Array<number>;
  maintainUserClicks: Array<boolean>;
  numberOfCells: number = 9;
  circleClass: string;
  xClass: string;
  isCircleTurn: boolean;
  currentClass: string;
  currentCell: Element;
  // This is the most important logic of the app.
  winningCombinations: Array<Array<number>>;
  // Rather than checking the dom we maintain a map of X's and O's which keeps the comparisons simple.
  mapOfX: Map<number, string>;
  mapOfCircles: Map<number, string>;
  cellsFilled: number;
  winningMessage: string;
  hasGameEnded: boolean;
  gatherCells: Array<Element>;

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {
    this.initializeVariables();
  }

  initializeVariables() {
    this.elementRef.nativeElement.querySelectorAll('.board__cell').forEach(cell => {
      this.renderer.removeClass(cell, this.circleClass);
      this.renderer.removeClass(cell, this.xClass);
    });

    this.circleClass = "board__cell--circle";
    this.xClass = "board__cell--x";
    this.items = Array(this.numberOfCells).fill(0);
    this.maintainUserClicks = Array(this.numberOfCells).fill(false);
    this.mapOfX = new Map<number, string>();
    this.mapOfCircles = new Map<number, string>();
    this.cellsFilled = 0;
    this.hasGameEnded = false;
    this.isCircleTurn = false;
    // this.gatherCells = Array.from(document.getElementsByClassName("board__cell"));
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  cellClick($event, index) {
    if (!this.maintainUserClicks[index]) {
      this.cellsFilled++;
      this.currentClass = this.isCircleTurn ? this.circleClass : this.xClass;
      this.placeMark($event.target, this.currentClass);
      this.populateMap(index);
      this.checkResult();
      this.swapTurn();
    }
    this.maintainUserClicks[index] = true;
  }

  populateMap(index) {
    if (this.currentClass === this.circleClass) {
      this.mapOfCircles.set(index, this.circleClass);
    } else {
      this.mapOfX.set(index, this.xClass);
    }
  }

  swapTurn() {
    this.isCircleTurn = !this.isCircleTurn;
  }

  placeMark(currentCell, currentClass) {
    this.renderer.addClass(currentCell, currentClass);
  }

  checkResult() {
    let someOneWon = false;
    for (let index = 0; index < this.winningCombinations.length; index++) {
      let combination = this.winningCombinations[index];
      let counterX = 0;
      let counterCircle = 0;
      for (let innerIndex = 0; innerIndex < combination.length; innerIndex++) {
        let cellIndex = combination[innerIndex];
        if (this.mapOfX.has(cellIndex)) {
          counterX++;
        }
        if (this.mapOfCircles.has(cellIndex)) {
          counterCircle++;
        }
        if (counterCircle === 3) {
          someOneWon = true;
          this.endGame("Circle Won");
        }
        if (counterX === 3) {
          someOneWon = true;
          this.endGame("X Won");
        }
      }
    }
    if (!someOneWon && this.cellsFilled === 9) {
      this.endGame("It is a draw");
    }
  }

  endGame(message: string) {
    this.winningMessage = message;
    this.hasGameEnded = true;
  }
}