export interface ProviderCheckResult {
  id: string;
  category: string;
  name: string;
  selector: string;
  status: 'SUCCESS' | 'FAILED';
  reason?: string;
  errorCode?: string;
  durationMs: number;
  attempts: number;
  details: string;
}

export interface ErrorPattern {
  id: string;
  label: string;
  triggerWords: string[];
  outputReason: string;
  description: string;
  severity: 'high' | 'medium' | 'info';
}
