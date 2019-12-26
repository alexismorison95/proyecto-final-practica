// PARA CREAR UN MODULO
import { NgModule } from '@angular/core';

import { MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

@NgModule({

    imports: [ MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
        MatMenuModule, MatDividerModule, MatGridListModule, MatSnackBarModule, MatFormFieldModule, 
        MatInputModule ],

    exports: [ MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
        MatMenuModule, MatDividerModule, MatGridListModule, MatSnackBarModule, MatFormFieldModule,
        MatInputModule ]

})
export class MaterialModulo {}