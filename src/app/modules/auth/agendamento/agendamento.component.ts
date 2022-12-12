import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { createEventId, INITIAL_EVENTS } from './event-utils';
import { AgendamentoService } from './agendamento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit, OnChanges {
  
  formValues = null;
  operation: 'view' | 'new' | 'edit' = 'new';


  anotherVar: String = '';
  
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {  
    this.agendamentoService.changeVar.subscribe(message => {
      if (message !== this.anotherVar) {
          this.anotherVar = message;
      }
    });
    console.log(this.anotherVar);
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  changeView(
    value: 'dayGridMonth' | 'dayGridDay' | 'dayGridWeek'
  ): void {
    this.calendarOptions.headerToolbar['right'] = value;
  }

  openDialog(data?): void {
    if (this.operation !== 'view') {
      this._dialog.open(DialogContentComponent, {
        maxHeight: '80vh',
        maxWidth: '95vh',
        height: AUTO_STYLE,
        width: window.innerWidth < 900 ? '95%' : '50%',
        disableClose: true,
        data: { data },
      }).afterClosed().subscribe((result) => {
        if (!result) {
          return;
        }
        this.formValues = result;
      });
    }
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = JSON.stringify(new Date())
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
