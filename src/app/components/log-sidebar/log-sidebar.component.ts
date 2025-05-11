import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { LogFiltersComponent } from '../log-filters/log-filters.component';
import { ProcessorManagementComponent } from '../processor-management/processor-management.component';

@Component({
  selector: 'app-log-sidebar',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, LogFiltersComponent, ProcessorManagementComponent],
  templateUrl: './log-sidebar.component.html',
  styleUrls: ['./log-sidebar.component.css']
})
export class LogSidebarComponent {
  @Input() processorTypes: string[] = [];
  @Input() selectedProcessor: string = '';
  @Input() selectedLevels: string[] = [];

  @Output() fileSelected = new EventEmitter<File>();
  @Output() levelsChanged = new EventEmitter<string[]>();
  @Output() processorSelected = new EventEmitter<string>();
  @Output() exportProcessor = new EventEmitter<void>();
  @Output() deleteProcessor = new EventEmitter<void>();

@Output() resetRequested = new EventEmitter<void>();

resetAll() {
  this.processorSelected.emit('iis');
  this.levelsChanged.emit(['info', 'warn', 'error']);
  this.resetRequested.emit(); // זה מעדכן את app.component
}


  handleFileUpload(file: File) {
    this.fileSelected.emit(file);
  }

  handleLevelsUpdate(levels: string[]) {
    this.levelsChanged.emit(levels);
  }

  handleProcessorUpdate(proc: string) {
    this.processorSelected.emit(proc);
  }
  
}
