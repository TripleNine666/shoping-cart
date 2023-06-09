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
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';





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
    MessagesModule,
    AvatarModule,
    DialogModule,
    RadioButtonModule,
    PanelModule,
    CardModule,
    TableModule,
    TagModule
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
    MessagesModule,
    AvatarModule,
    DialogModule,
    RadioButtonModule,
    PanelModule,
    CardModule,
    TableModule,
    TagModule
  ]
})
export class PrimengModule { }
