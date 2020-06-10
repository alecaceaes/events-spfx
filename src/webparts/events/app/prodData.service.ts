import { IEvent, IAttendee, IDataService } from './interfaces.module';
import { IQService, IPromise, IDeferred } from 'angular';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IItemAddResult } from "@pnp/sp/items";

export default class ProdDataService implements IDataService {
  private eventItems: IEvent[] = [];

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
    return null;
  }

  public deleteEvent(event: IEvent): IPromise<{}> {
    return null;
  }

  public getAttendees(showpastevents?: boolean): IPromise<IAttendee[]> {
    return null;
  }

  public addAttendee(attendee: IAttendee): IPromise<{}> {
    const deferred: IDeferred<IItemAddResult> = this.$q.defer();
    const ds = this;

    sp.web.lists.getByTitle('Attendees').items.add(attendee)
      .then((iar: IItemAddResult) => {
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
