import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HidePasswordDirective } from './show-hide-password/hide-password.directive';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        HidePasswordDirective,
        SearchFilterComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule
    ],
    exports: [
        HidePasswordDirective,
        SearchFilterComponent
    ]
})
export class SharedModule { }