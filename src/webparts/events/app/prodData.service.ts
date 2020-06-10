import { IEvent, IAttendee, IDataService } from './interfaces.module';
import { IQService, IPromise, IDeferred } from 'angular';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";

export default class ProdDataService implements IDataService {
  private eventItems: IEvent[] = [];
  private attendeeItems: IAttendee[] = [];

  constructor(private $q: IQService) {

  }

  public getEvents(showpastevents?: boolean): IPromise<IEvent[]> {
    const deferred: IDeferred<IEvent[]> = this.$q.defer();
    const ds = this;

    sp.web.lists.getByTitle('Events').items.select("Id", "Title", "StartDate", "EndDate", "Campus", "TotalAttendees").get<IEvent[]>()
      .then(e => {
        ds.eventItems = [];
        for (let i: number = 0; i < e.length; i++) {
          let datetest = new Date(e[i].StartDate);
          if (datetest < new Date() && !showpastevents) {
            continue;
          }
          ds.eventItems.push(e[i]);
        }
        deferred.resolve(ds.eventItems);
      });

      return deferred.promise;
  }

  public addEvent(event: IEvent): IPromise<{}> {
    const deferred: IDeferred<IItemAddResult> = this.$q.defer();

    sp.web.lists.getByTitle('Events').items.add(event)
      .then((e: IItemAddResult) => {
        this.eventItems.push({
          ID: e.data.ID,
          Title: event.Title,
          StartDate: event.StartDate,
          EndDate: event.EndDate,
          Campus: event.Campus,
          TotalAttendees: 0
        });

        deferred.resolve(e);
      });

      return deferred.promise;
  }

  public updateEvent(event: IEvent): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();
    let ds = this;

    sp.web.lists.getByTitle('Events').items.getById(event.ID).update({
      Title: event.Title,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Campus: event.Campus,
      TotalAttendees: event.TotalAttendees
    }).then(u => {
      for (let i: number = 0; i < ds.eventItems.length; i++) {
        if (ds.eventItems[i].ID == event.ID) {
          ds.eventItems[i].Campus = event.Campus;
          ds.eventItems[i].EndDate = event.EndDate;
          ds.eventItems[i].StartDate = event.StartDate;
          ds.eventItems[i].Title = event.Title;
          ds.eventItems[i].TotalAttendees = event.TotalAttendees;
        }
      }
      deferred.resolve(u);
    });

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public getAttendees(showpastevents?: boolean): IPromise<IAttendee[]> {
    const deferred: IDeferred<IAttendee[]> = this.$q.defer();

    sp.web.lists.getByTitle("Attendees").items.select("Id","FullName1","Email","EventID").get<IAttendee[]>()
      .then(e => {
        this.attendeeItems = [];
        for (let i: number = 0; i < e.length; i++) {
          this.attendeeItems.push(e[i]);
        }

        deferred.resolve(this.attendeeItems);
      });

      return deferred.promise;
  }

  public addAttendee(attendee: IAttendee): IPromise<{}> {
    const deferred: IDeferred<IItemUpdateResult> = this.$q.defer();
    const ds = this;

    sp.web.lists.getByTitle('Attendees').items.add(attendee)
      .then((iar: IItemUpdateResult) => {
        for (let i: number = 0; i < ds.eventItems.length; i++) {
          if (ds.eventItems[i].ID === attendee.EventID) {
            let total: number = ++this.eventItems[i].TotalAttendees;
            let eventItem: IEvent = this.eventItems[i];
            eventItem.TotalAttendees = total;

            this.updateEvent(eventItem).then((iar2:IItemAddResult) => {
              deferred.resolve(iar);
            })
          }
        }
      });

      return deferred.promise;
  }

  public updateAttendee(attendee: IAttendee): IPromise<{}> {
    const deferred: IDeferred<{}> = this.$q.defer();
    let ds = this;

    sp.web.lists.getByTitle("Attendees").items.getById(attendee.ID).update({
      FullName1: attendee.Fullname1,
      Email: attendee.Email,
      EventID: attendee.EventID
    }).then((iar: IItemUpdateResult) => {
      for (let i: number = 0; i < ds.attendeeItems.length; i++) {
        if (ds.attendeeItems[i].ID === attendee.ID) {
          ds.attendeeItems[i].Email = attendee.Email;
          ds.attendeeItems[i].Fullname1 = attendee.Fullname1;
          ds.attendeeItems[i].EventID = attendee.EventID;
        }
      }

      deferred.resolve(iar);
    });

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
