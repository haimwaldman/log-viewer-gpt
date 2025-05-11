import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getHebrewLevel } from '../../shared/log-utils'; // הנתיב בהתאם למיקום

@Component({
  selector: 'app-log-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-filters.component.html',
  styleUrls: ['./log-filters.component.css']
})
export class LogFiltersComponent {
  @Input() selectedLevels: string[] = [];
  @Output() levelsUpdated = new EventEmitter<string[]>();

  levels = ['error', 'warn', 'info'];
  getHebrewLevel = getHebrewLevel;

  toggleLevel(level: string) {
    if (this.selectedLevels.includes(level)) {
      this.selectedLevels = this.selectedLevels.filter(l => l !== level);
    } else {
      this.selectedLevels = [...this.selectedLevels, level];
    }
    this.levelsUpdated.emit(this.selectedLevels);
  }

  selectAll() {
    this.selectedLevels = [...this.levels];
    this.levelsUpdated.emit(this.selectedLevels);
  }

  clearAll() {
    this.selectedLevels = [];
    this.levelsUpdated.emit(this.selectedLevels);
  }
}
