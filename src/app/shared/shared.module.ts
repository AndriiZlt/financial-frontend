import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [SpinnerComponent, StatusComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent, StatusComponent],
})
export class SharedModule {}
