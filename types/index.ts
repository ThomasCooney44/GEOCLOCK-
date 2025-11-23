export interface Alarm {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // meters
  enabled: boolean;
  disableAfterTrigger?: boolean;
}
