import { Component, OnInit, ViewChild } from '@angular/core';
import { MatrixComponent } from '../matrix/matrix.component';
import { animate, style, transition, trigger, query } from '@angular/animations';

@Component({
  selector: 'matrix-math',
  templateUrl: './matrix-math.component.html',
  styleUrls: ['./matrix-math.component.less'],
  animations: [
    trigger('matrixResized', [
      transition('* => *', [
        query(':self', [
          style( { opacity: 0, transform: 'translateY(100px)' } ),
          animate( '{{matrixLen}}s 0s ease-out', style({ opacity: 1, transform: 'none' }))
        ], { optional: true, params: {matrixLen: '.8'}})
      ])
    ]),
    trigger('determinantChanged', [
      transition('* => *', [
        style( { opacity: 0 } ),
        animate( '.5s', style( {opacity: 1}))
      ])
    ]),
    trigger('updateWarningMessage', [
      transition('* => *', [
        style( { opacity: 0, transform: 'translateY(-50%)' } ),
        animate( '.5s', style( {opacity: 1, transform: 'none'}))
      ])
    ])
  ]
})
export class MatrixMathComponent implements OnInit {

  @ViewChild(MatrixComponent) matrix: MatrixComponent;
  @ViewChild('warningSection') warningSection: HTMLDivElement;

  dimensionInput: number;
  warningMessage: string = '';
  isNaN: Function = Number.isNaN;

  constructor() { }

  ngOnInit() {
  }

  resizeMatrix() {
    this.matrix.resize(this.dimensionInput);
  }

  getDeterminant(): number {
    return this.matrix.getDeterminant();
  }

  onResizeClick() {
    if(isNaN(this.dimensionInput) || (!this.dimensionInput && this.dimensionInput != 0) || this.dimensionInput % 1 != 0 || this.dimensionInput < 0 || this.dimensionInput > 10) {
      this.warningMessage = 'Please Enter an Integer Dimension Between 0 and 10';
      return;
    }
    this.warningMessage = '';
    this.matrix.resize(this.dimensionInput)
  }

}
