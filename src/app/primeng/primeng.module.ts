import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import { ToolbarModule } from 'primeng/toolbar';
import { DataViewModule } from 'primeng/dataview';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';







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
    TabViewModule,
    ChipModule,
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ToolbarModule,
    DataViewModule,
    TabViewModule,
    ChipModule,
  ]
})
export class PrimengModule { }
