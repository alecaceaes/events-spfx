import { IItemAddResult } from '@pnp/sp/items';
import { IEvent, IAttendee, IDataService } from "./interfaces.module";
import { IWindowService, IRootScopeService, IAngularEvent } from "angular";

export default class HomeController {
  public isLoading: boolean = false;
  public newEvent: IEvent = null;
  public eventCollection: IEvent[] = [];
  public attendeeCollection: IAttendee[] = [];
  private showpastevents: boolean = false;
  public currentEmail: string = '';
  public newAttendeeEventID: number = 0;
  public newAttendeeFullName: string = '';
  public newAttendeeEmail: string = '';
  public newEventName: string = '';
  public newEventCampus: string = '';
  public newEventStartDate: string = '';
  public newEventStartTime: string = '';
  public newEventEndDate: string = '';
  public newEventEndTime: string = '';

  constructor(
    private dataService: IDataService,
    private $window: IWindowService,
    private $rootScope: IRootScopeService) {
      const vm: HomeController = this;
      this.init();

      $rootScope.$on('configurationChanged', (event: IAngularEvent, args: { showpastevents: boolean }) => {
        vm.init(args.showpastevents);
      });
  }

  private init(showpastevents?: boolean): void {
    this.showpastevents = showpastevents;
    this.getCurrentEmail();
    this.loadEvents(showpastevents);
    this.loadAttendees(showpastevents);
  }

  private getCurrentEmail(): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getCurrentEmail()
      .then((email: string): void => {
        vm.currentEmail = email;
      });
  }

  private RegisterAttendee(): void {

  }

  private UpdateEvent(event: IEvent): void {
    const vm: HomeController = this;

    this.dataService.updateEvent(event)
      .then((iar: IItemAddResult) => {
        alert("Updated");
      });
  }

  private deleteAttendee(attendee: IAttendee): void {
    const vm: HomeController = this;

    this.dataService.deleteAttendee(attendee).then(_ => {
      vm.loadEvents();
    })
  }

  private deleteEvent(event: IEvent): void {
    const vm: HomeController = this;

    this.dataService.deleteEvent(event)
      .then(_ => {
        vm.loadEvents();
      });
  }

  private loadEvents(showpastevents?: boolean): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getEvents(showpastevents)
      .then((events: IEvent[]): void => {
        vm.eventCollection = [];
        vm.eventCollection = events;
      });
  }

  private loadAttendees(showpastevents?: boolean): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getAttendees(showpastevents)
      .then((attendees: IAttendee[]): void => {
        vm.attendeeCollection = [];
        vm.attendeeCollection = attendees;
      });
  }

  private addAttendee(): void {
    const vm: HomeController = this;

    let attendee: IAttendee = {
      Fullname1: this.newAttendeeFullName,
      Email: this.newAttendeeEmail,
      EventID: this.newAttendeeEventID
    };

    this.dataService.addAttendee(attendee)
      .then((iar: IItemAddResult) => {
        vm.loadAttendees();

        this.newAttendeeFullName = '';
        this.newAttendeeEmail = '';
        this.newAttendeeEventID = 0;
      });
  }

  private addEvent(): void {
    const vm: HomeController = this;

    var event: IEvent = {
      Title: vm.newEventName,
      StartDate: new Date(vm.newEventStartDate + ' ' + vm.newEventStartTime).toDateString(),
      EndDate: new Date(vm.newEventEndDate + ' ' + vm.newEventEndTime).toDateString(),
      Campus: vm.newEventCampus,
      TotalAttendees: 0
    };

    this.dataService.addEvent(event).then((iar: IItemAddResult) => {
      vm.loadEvents();

      vm.newEventName = '';
      vm.newEventCampus = '';
      vm.newEventStartDate = '';
      vm.newEventStartTime = '';
      vm.newEventEndDate = '';
      vm.newEventEndTime = '';
    });
  }

  private updateAttendee(attendee: IAttendee): void {
    const vm: HomeController = this;

    this.dataService.updateAttendee(attendee)
      .then((iar: IItemAddResult) => {
        alert("Updated");
      });
  }
}
