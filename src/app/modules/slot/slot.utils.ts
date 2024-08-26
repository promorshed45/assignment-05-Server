export const parseTimeToMinutes = (time: string): number => {
    const [hours = 0, minutes = 0] = (time.split(':') as [string, string]).map(Number) || [0, 0];
  
    return hours * 60 + minutes;
  };
  
  export const formatMinutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  