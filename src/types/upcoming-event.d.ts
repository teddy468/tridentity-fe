declare interface UpcomingEvent {
  cover: string;
  name: string;
  description: string;
  publisher: string;
  date: string;
}

declare interface GetUpcomingEventResponse extends UpcomingEvent {}

declare type GetUpcomingEventsResponse = PaginationData<UpcomingEvent>;

declare interface GetUpcomingEventsError {}

declare interface GetUpcomingEventError {}
