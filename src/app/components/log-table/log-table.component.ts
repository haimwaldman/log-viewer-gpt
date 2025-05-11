import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getHebrewLevel } from '../../shared/log-utils';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent {
  @Input() logs: any[] = [];
  @Input() selectedLevels: string[] = [];
  @Input() currentPage: number = 1;
  @Input() logsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  tooltipContent: string = '';
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  copied = false;
  getHebrewLevel = getHebrewLevel;

  get pagedLogs() {
    const start = (this.currentPage - 1) * this.logsPerPage;
    return this.logs.slice(start, start + this.logsPerPage);
  }

showTooltip(event: MouseEvent, content: string) {
  const td = event.target as HTMLElement;
  const wrapper = td.closest('td')?.querySelector('.cell-content') as HTMLElement;

  if (wrapper && wrapper.scrollWidth > wrapper.clientWidth) {
    this.tooltipContent = content;
    this.tooltipVisible = true;
    this.tooltipX = event.clientX + 10;
    this.tooltipY = event.clientY + 10;
    this.copied = false;
  } else {
    this.tooltipVisible = false;
  }
}

  hideTooltip() {
    this.tooltipVisible = false;
  }

copyToClipboard() {
  navigator.clipboard.writeText(this.tooltipContent).then(() => {
    this.copied = true;
    setTimeout(() => (this.copied = false), 1500);
  });
}


@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.tooltip')) {
    this.hideTooltip();
  }
}


  nextPage() {
    const totalPages = Math.ceil(this.logs.length / this.logsPerPage);
    if (this.currentPage < totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  get totalPages() {
    return Math.ceil(this.logs.length / this.logsPerPage);
  }
}
