import { IEvent, IAttendee, IDataService } from "./interfaces.module";
import { IWindowService, IRootScopeService } from "angular";

export default class HomeController {
  public isLoading: boolean = false;
  public newEvent: IEvent = null;
  public eventCollection: IEvent[] = [];
  public attendeeCollection: IAttendee[] = [];
  private showpastevents: boolean = false;
  public currentEmail: string = '';
  public newAttendeeEventID: number = 0;
  public newAttendeeFullName: string = '';
  public newAttendeeFullEmail: string = '';
  public newEventName: string = '';
  public newEventCampus: string = '';
  public newEventStartDate: string = '';
  public newEventStartTime: string = '';
  public newEventEndDate: string = '';
  public newEventEndTime: string = '';

  constructor(
    private dateService: IDataService,
    private $window: IWindowService,
    private $rootScope: IRootScopeService) {
      const vm: HomeController = this;
      this.init();
  }

  private init(showpastevents?: boolean): void {
    this.showpastevents = showpastevents;
  }

  private getCurrentEmail(): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dateService.getCurrentEmail()
      .then((email: string): void => {
        vm.currentEmail = email;
      });
  }

  private RegisterAttendee(): void {

  }

  private AddEvent(): void {

  }

  private UpdateAttendeet(attendee: IAttendee): void {

  }

  private UpdateEvent(event: IEvent): void {

  }

  private DeleteAttendeet(attendee: IAttendee): void {

  }

  private DeleteEvent(event: IEvent): void {

  }

  private loadEvents(showpastevents?: boolean): void {

  }

  private loadAttendees(showpastevents?: boolean): void {

  }

  private addAttendee(): void {

  }

  private addEvent(): void {

  }
}
