import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-result-example',
  template: `
  <div>
    <h2>编辑描述</h2>
    <md-dialog-content>123</md-dialog-content>
    <md-dialog-actions></md-dialog-actions>
  </div>
  `,
})
export class CoverDescriptionEdit {
  selectedOption: string;

  constructor() { }
}
