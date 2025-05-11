import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-processor-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processor-management.component.html',
  styleUrls: ['./processor-management.component.css']
})
export class ProcessorManagementComponent {
  @Output() export = new EventEmitter<void>();
  @Output() manage = new EventEmitter<void>();

  handleExport() {
    this.export.emit();
  }

  handleManage() {
    this.manage.emit();
  }
}
