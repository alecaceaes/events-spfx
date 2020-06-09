import { IEvent, IAttendee, IDataService } from './interfaces.module';
import { IQService, IPromise, IDeferred } from 'angular';

export default class ProdDataService implements IDataService {

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
