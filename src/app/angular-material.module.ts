import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatTableModule} from '@angular/material/table';

@NgModule({
   imports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatGridListModule,
      // MatTableModule,
      MatCardModule,
      MatTooltipModule
   ],
   exports: [
      MatIconModule,
      MatTabsModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatGridListModule,
      // MatTableModule,
      MatCardModule,
      MatTooltipModule
   ]
})

export class AngularMaterialModule { }