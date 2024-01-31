export interface EventResponseType {
  eventID: number;
  eventName: string;
}

export type EventMetadata = Pick<EventResponseType, 'eventID' | 'eventName'>;
