interface Notes {
  id: number;
  time: string;
  size: string;
  firstsize: string;
  lastsize: string;
}

interface DetailReturn {
  value: number;
  text?: string;
  datasets?: any;
}

export type { Notes, DetailReturn };
