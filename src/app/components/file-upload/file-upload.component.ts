import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() processors: string[] = [];
  @Input() selectedProcessor: string = '';

  @Output() fileLoaded = new EventEmitter<File>();
  @Output() processorChanged = new EventEmitter<string>();

  dragOver = false;

  onProcessorChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.processorChanged.emit(value);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileLoaded.emit(file);
    }
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  handleDragLeave() {
    this.dragOver = false;
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.fileLoaded.emit(file);
    }
  }
}
