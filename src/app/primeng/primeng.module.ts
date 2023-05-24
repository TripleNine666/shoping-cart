import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import { ToolbarModule } from 'primeng/toolbar';
import { DataViewModule } from 'primeng/dataview';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    RippleModule,
    ToolbarModule,
    DataViewModule,
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ToolbarModule,
    DataViewModule,
  ]
})
export class PrimengModule { }
