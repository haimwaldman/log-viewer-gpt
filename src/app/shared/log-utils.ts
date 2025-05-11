export function getHebrewLevel(level: string): string {
  switch (level) {
    case 'error':
      return 'שגיאה';
    case 'warn':
      return 'אזהרה';
    case 'info':
      return 'מידע';
    default:
      return level;
  }
}