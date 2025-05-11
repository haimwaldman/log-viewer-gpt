import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  parse(content: string, processor: string): any[] {
    switch (processor) {
      case 'iis':
        return this.parseIIS(content);
      case 'apache':
        return this.parseApache(content);
      case 'custom':
        return this.parseCustomJson(content);

      default:
        return [];
    }
  }

  private parseIIS(content: string): any[] {
  return content
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map((line, i) => {
      const parts = line.trim().split(/\s+/);
      const [date, time, method, path, status] = parts;

      // הגנה - דלג אם הנתונים לא תקינים
      if (!date || !time || !status) return null;

      return {
        id: i + 1,
        timestamp: new Date(`${date}T${time}`),
        level: this.getLogLevel(status),
        message: `${method} ${path} -> ${status}`
      };
    })
    .filter(Boolean);
}


  private parseApache(content: string): any[] {
    const regex = /^.*\[(.*?)\] \"(.*?)\" (\d{3}) \d+/;
    return content
      .split('\n')
      .filter(line => regex.test(line))
      .map((line, i) => {
        const match = line.match(regex);
        if (!match) return null;
        const [_, timestamp, request, status] = match;
        return {
          id: i + 1,
          timestamp: new Date(), // ניתן לשפר לפירסור תאריך אמיתי
          level: this.getLogLevel(status),
          message: `${request} -> ${status}`
        };
      })
      .filter(Boolean);
  }
  private parseCustomJson(content: string): any[] {
  const lines = content.split('\n').filter(l => l.trim());

  return lines.map((line, i) => {
    let parsed: any;
    try {
      parsed = JSON.parse(line);
    } catch {
      throw new Error(`שורה ${i + 1} אינה פורמט JSON תקני`);
    }

    return {
      id: i + 1,
      timestamp: parsed.timestamp ? new Date(parsed.timestamp) : new Date(),
      level: parsed.level || 'info',
      message: parsed.message || '(ללא תוכן)'
    };
  });
}



  private getLogLevel(status: string | number): string {
    const code = parseInt(status.toString(), 10);
    if (code >= 500) return 'error';
    if (code >= 400) return 'warn';
    return 'info';
  }
}
