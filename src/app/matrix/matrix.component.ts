import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.less'],
  animations: [
    trigger('matrixAnimation', [
      transition('* => *', [
        query('tr:enter', [
          style( { textAlign: 'center' } ),
        ], { optional: true }),
        query('tr:enter .matrix-cell', [
          style( { opacity: 0, transform: 'translateY(100px) rotate(30deg)' } ),
          stagger('.04s', [
            animate('.2s', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true})
      ])
    ])
  ]
})
export class MatrixComponent implements OnInit {

  // matrixCells follow the pattern:
  //
  // [[c0, c1, c2, ..., cN], [c0, c1, c2, ..., cN], ..., [c0, c1, c2, cN]]
  //          ^                      ^                           ^
  //          |                      |                           |
  //          r0                     r1                          rN
  //
  // | r0c0, r0c1, r0c2, ..., r0cN |
  // | r1c0, r1c1, ...,  ..., r1cN |
  // | r2c0, ...,  ...,  ..., r2cN |
  // | ...,  ...,  ...,  ..., ...  |
  // | rNc0, ...,  ...,  ..., rNcN |
  //
  // where N is the dimension of the matrix
  cells: number[][];
  determinant: number;

  constructor() { 
    this.cells = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.determinant = 0;
  }

  ngOnInit() {
  }

  trackByIndex(index: number, item: number): number {
    return index;
  }

  resize(newDimension: number) {
    if (newDimension % 1 != 0) return;

    this.cells = [];

    for(let i = 0; i < newDimension; i++) {
      this.cells.push([]);

      for(let j = 0; j < newDimension; j++) {
        this.cells[i].push(0);
      }
    }

    this.determinant = 0;
  }

  getDeterminant(): number {
    this.determinant = this.calculateDeterminant(this.cells);
    return this.determinant;
  }

  calculateDeterminant(cells: number[][]): number {
    if(!this.canGetDeterminant(this.cells)) {
      return NaN;
    } 
    let determinant: number = null;

    if(cells.length > 2) {
      determinant = 0;  
      let row = 0;
      for(let col = 0; col < cells[row].length; col++) {
        let multiplier = cells[row][col];
        let subMatrix = this.getSubMatrix(row, col, cells);
        let subDeteminant = this.calculateDeterminant(subMatrix);
        let modifier = col % 1 == 0 ? 1 : -1;
        determinant += modifier * multiplier * subDeteminant;
      }
    }
    else if (cells.length == 2) {
      determinant = cells[0][0] * cells[1][1] - cells[0][1] * cells[1][0];
    }
    else if (cells.length == 1) {
      determinant = cells[0][0];
    }
    else if (cells.length == 0) { 
      https://en.wikipedia.org/wiki/Matrix_(mathematics)#Empty_matrices
      determinant = 1;
    }

    return determinant;
  }

  canGetDeterminant(cells: number[][]): boolean {
    for(let row = 0; row < cells.length; row++) {
      if(cells.length != cells[row].length) return false;
      for(let col = 0; col < cells[row].length; col++) {
        if(!cells[row][col] && cells[row][col] != 0) return false;
      }
    }

    return true;
  }

  getSubMatrix(multiplierRow: number, multiplierCol: number, cells: number[][]): number[][] {
    let subMatrix: number[][] = [];
    let subRow = 0;

    for(let row = 0; row < cells.length; row++) {
      if (row == multiplierRow) continue;
      subMatrix.push([]);
      
      for(let col = 0; col < cells[row].length; col++) {
        if (col == multiplierCol) continue;
        subMatrix[subRow].push(cells[row][col]);
      }

      subRow++
    }

    return subMatrix;
  }
}
