import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getHebrewLevel } from '../../shared/log-utils';

@Component({
  selector: 'app-log-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-summary.component.html',
  styleUrls: ['./log-summary.component.css']
})
export class LogSummaryComponent {
  @Input() fileName: string = '';
  @Input() logs: { level: string }[] = [];
  getHebrewLevel = getHebrewLevel;


  count(level: string): number {
    return this.logs.filter(log => log.level === level).length;
  }
}
