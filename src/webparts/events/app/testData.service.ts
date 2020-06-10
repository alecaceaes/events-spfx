import { IItemAddResult } from '@pnp/sp/items';
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
    const deferred: IDeferred<IEvent[]> = this.$q.defer();
    let eventItems: IEvent[] = [];

    for(let i: number = 0; i < this.eventItems.length; i++) {
      let datetest = new Date(this.eventItems[i].StartDate);
      if (datetest < new Date() && !showpastevents) {
        continue;
      }
      else {
        eventItems.push(this.eventItems[i]);
      }
    }

    deferred.resolve(eventItems);

    return deferred.promise;
  }

  public addEvent(event: IEvent): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();

    this.nextAttendeeId = this.nextAttendeeId++;

    let myData = {
      ID: this.nextEventId
    };

    let iar: IItemAddResult = {
      data: myData,
      item: null
    };

    this.eventItems.push({
      ID: this.nextAttendeeId,
      Title: event.Title,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Campus: event.Campus,
      TotalAttendees: 0
    });

    deferred.resolve(iar);

    return deferred.promise;
  }

  public updateEvent(event: IEvent): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();

    for (let i: number = 0; i < this.eventItems.length; i++) {
      if (this.eventItems[i].ID === event.ID) {
        this.eventItems[i].Campus = event.Campus;
        this.eventItems[i].EndDate = event.EndDate;
        this.eventItems[i].StartDate = event.StartDate;
        this.eventItems[i].Title = event.Title;
        this.eventItems[i].TotalAttendees = event.TotalAttendees;
      }
    }

    deferred.resolve(event);

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public getAttendees(showpastevents?: boolean): IPromise<IAttendee[]> {
    const deferred: IDeferred<IAttendee[]> = this.$q.defer();
    let attendeeItems: IAttendee[] = [];

    for (let i: number = 0; i < this.attendeeItems.length; i++) {
      attendeeItems.push(this.attendeeItems[i]);
    }

    deferred.resolve(this.attendeeItems);

    return deferred.promise;
  }

  public addAttendee(attendee: IAttendee): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();

    this.nextAttendeeId = this.nextAttendeeId++;

    let myData = {
      ID: this.nextAttendeeId
    };

    let iar: IItemAddResult = {
      data: myData,
      item: null
    };

    for(let i: number = 0; i < this.eventItems.length; i++) {
      if(this.eventItems[i].ID === attendee.EventID) {
        let total: number = ++this.eventItems[i].TotalAttendees;
        let eventItem: IEvent = this.eventItems[i];
        eventItem.TotalAttendees = total;

        this.updateEvent(eventItem).then((iar2: IItemAddResult) => {
          deferred.resolve(iar);
        });
      }
    }

    return deferred.promise;
  }

  public updateAttendee(attendee: IAttendee): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();

    for (let i: number = 0; i < this.attendeeItems.length; i ++) {
      if (this.attendeeItems[i].ID === attendee.ID) {
        this.attendeeItems[i].Email = attendee.Email;
        this.attendeeItems[i].Fullname1 = attendee.Fullname1;
        this.attendeeItems[i].EventID = attendee.EventID;
      }
    }

    deferred.resolve(attendee);

    return deferred.promise;
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
