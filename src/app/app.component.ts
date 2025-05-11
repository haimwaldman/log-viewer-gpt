import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSidebarComponent } from './components/log-sidebar/log-sidebar.component';
import { LogSummaryComponent } from './components/log-summary/log-summary.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { LogService } from './shared/log.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LogSidebarComponent, LogSummaryComponent, LogTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private logService: LogService) {}

  fileName: string = '';
  logs: any[] = [];
  selectedLevels: string[] = ['error', 'warn', 'info'];
  currentPage: number = 1;
  logsPerPage: number = 10;
  selectedProcessor: string = 'iis';
  processorTypes = ['iis', 'apache', 'custom'];

  get filteredLogs(): any[] {
    return this.logs.filter(log => this.selectedLevels.includes(log.level));
  }

  handleFileSelected(file: File) {
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      this.logs = this.logService.parse(content, this.selectedProcessor);
      this.currentPage = 1;
    };
    reader.readAsText(file);
  }

  handleLevelsChanged(levels: string[]) {
    this.selectedLevels = levels;
    this.currentPage = 1;
  }

  handleProcessorSelected(processor: string) {
    this.selectedProcessor = processor;
  }

  exportProcessor() {
    console.log('Export processor config:', this.selectedProcessor);
  }

  deleteProcessor() {
    console.log('Delete processor config:', this.selectedProcessor);
  }

  handlePageChange(newPage: number) {
    this.currentPage = newPage;
  }

  resetAll() {
  this.logs = [];
  this.fileName = '';
  this.selectedLevels = ['info', 'warn', 'error'];
  this.selectedProcessor = 'iis';
  this.currentPage = 1;
}

}
