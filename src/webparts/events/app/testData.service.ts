import { IEvent, IAttendee, IDataService } from './interfaces.module';
import { IQService, IPromise,IDeferred } from 'angular';

export default class TestDataService implements IDataService {

  public static $inject: string[] = ['$q'];
  private nextEventId = 5;
  private nextAttendeeId = 4;

  private eventItems: IEvent[] = [
    {
      ID: 1,
      Title: 'Prepare demo Web Part',
      StartDate: new Date(2018, 1, 1).toDateString(),
      EndDate: new Date(2018, 1, 1).toDateString(),
      Campus: 'North',
      TotalAttendees: 10
    },
    {
      ID: 2,
      Title: 'Company Meeting 1',
      StartDate: new Date(2018, 1, 2).toDateString(),
      EndDate: new Date(2018, 1, 2).toDateString(),
      Campus: 'South',
      TotalAttendees: 20
    },
    {
      ID: 3,
      Title: 'Company Meeting 2',
      StartDate: new Date(2018, 1, 3).toDateString(),
      EndDate: new Date(2018, 1, 3).toDateString(),
      Campus: 'East',
      TotalAttendees: 30
    },
    {
      ID: 4,
      Title: 'Past Event 1',
      StartDate: new Date("12/2/2017 13:00").toDateString(),
      EndDate: new Date("12/2/2017 14:00").toDateString(),
      Campus: 'West',
      TotalAttendees: 120
    }
  ];

  private attendeeItems: IAttendee[] = [
    {
      ID: 1,
      Fullname1: 'Clark Kent',
      Email: 'ckent@dailyplanet.com',
      EventID: 1
    },
    {
      ID: 2,
      Fullname1: 'Bruce Wayne',
      Email: 'bwayne@wayne.com',
      EventID: 2
    },
    {
      ID: 3,
      Fullname1: 'Diana Prince',
      Email: 'dprince@themyscire.com',
      EventID: 3
    },
  ];

  constructor(private $q: IQService) {

  }

  public getEvents(showpastevents?: boolean): IPromise<IEvent[]> {
    return null;
  }

  public addEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public updateEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public deleteEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public getAttendees(showpastevents?: boolean): IPromise<IAttendee[]> {
    return null;
  }

  public addAttendee(event: IAttendee): IPromise<{}> {
    return null;
  }

  public updateAttendee(event: IAttendee): IPromise<{}> {
    return null;
  }

  public deleteAttendee(event: IAttendee): IPromise<{}> {
    return null;
  }

  public getCurrentEmail(): IPromise<string> {
    const deferred: IDeferred<string> = this.$q.defer();
    const email: string = 'pam@beesly.microsoft.com';

    deferred.resolve(email);

    return deferred.promise;
  }
}