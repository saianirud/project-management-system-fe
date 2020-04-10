import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HidePasswordDirective } from './show-hide-password/hide-password.directive';

@NgModule({
    declarations: [
        HidePasswordDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FlexLayoutModule
    ],
    exports: [
        HidePasswordDirective
    ]
})
export class SharedModule { }