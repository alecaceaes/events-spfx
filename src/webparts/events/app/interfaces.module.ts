import * as angular from 'angular';

export interface IEvent {
  ID?: number;
  Title: string;
  StartDate: string;
  EndDate: string;
  Campus:String;
  TotalAttendees: number;
}

export interface IAttendee {
  ID?: number;
  Fullname1: string;
  Email: string;
  EventID: number;
}

export interface IDataService {
  getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]>;
  addEvent(event: IEvent): angular.IPromise<{}>;
  updateEvent(event: IEvent): angular.IPromise<{}>;
  deleteEvent(event: IEvent): angular.IPromise<{}>;
  getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]>;
  addAttendee(event: IAttendee): angular.IPromise<{}>;
  updateAttendee(event: IAttendee): angular.IPromise<{}>;
  deleteAttendee(event: IAttendee): angular.IPromise<{}>;
  getCurrentEmail(): angular.IPromise<string>;
}
