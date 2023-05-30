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
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';



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
    MenuModule,
    DividerModule,
    ToastModule,
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ToolbarModule,
    DataViewModule,
    TabViewModule,
    ChipModule,
    MenuModule,
    DividerModule,
    ToastModule,
  ]
})
export class PrimengModule { }
