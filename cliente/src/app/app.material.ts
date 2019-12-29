// PARA CREAR UN MODULO
import { NgModule } from '@angular/core';

import { MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatTableModule } from '@angular/material/table';

@NgModule({

    imports: [ MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
        MatMenuModule, MatDividerModule, MatGridListModule, MatSnackBarModule, MatFormFieldModule, 
        MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule ],

    exports: [ MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
        MatMenuModule, MatDividerModule, MatGridListModule, MatSnackBarModule, MatFormFieldModule,
        MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule ]

})
export class MaterialModulo {}