import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Calendar, CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId, INITIAL_EVENTS } from './event-utils';
import { AgendamentoService } from './agendamento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { AUTO_STYLE } from '@angular/animations';
import * as moment from 'moment';

export interface CalendarEvent {
  id: string;
  calendarId: string;
  recurringEventId: string | null;
  isFirstInstance: boolean;
  title: string;
  description: string;
  start: string | null;
  end: string | null;
  allDay: boolean;
  recurrence: string;
  duration: number | null;
  backgroundColor: string;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit, OnChanges {
  
  formValues = null;
  operation: 'view' | 'new' | 'edit' = 'new';
  dataSourceFuncionarios: [] = [];

  events: CalendarEvent[] = [];

  anotherVar: String = '';
  
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: 'pt-br',
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
    this.getFuncionario();
    this.onRefresh();

    const start = moment
    .utc(new Date())
    .format('YYYY-MM-DD[T]HH:mm:ss');
  const end = moment
    .utc(new Date())
    .format('YYYY-MM-DD[T]HH:mm:ss');
    
    this.events = [...this.events];
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  onSave(): void {
    
  }

  onRefresh(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      dateClick: this.onEventClick.bind(this),
      eventClick: function(info) {
        console.log(info.event.id);
      },
      events: [
        {
          calendarId: '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
          id: '132',
          title: 'teste',
          description: 'teste',
          duration: null,
          start: '2022-12-15T02:24:43',
          end: '2022-12-15T06:24:43',
          allDay: false,
          isFirstInstance: false,
          recurringEventId: null,
          recurrence: null,
          backgroundColor: 'green',
        }
      ]
    };
  }

  async getFuncionario(): Promise<void> {
    this.agendamentoService.readFuncionarios().subscribe(funcionario => {
      this.dataSourceFuncionarios = funcionario;
    });
  }

  changeView(
    value: 'dayGridMonth' | 'dayGridDay' | 'dayGridWeek'
  ): void {
    this.calendarOptions.headerToolbar['right'] = value;
  }

  openDialog(selectInfo?: DateSelectArg): void {
    // const value = this.calendarOptions.select();
    // console.log(value);
    this.handleDateSelect(selectInfo)
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg, data?) {

    console.log(selectInfo);
    

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
        const calendarApi = selectInfo.view.calendar;
        console.log(calendarApi);
        console.log('selectInfo',selectInfo);
        
        calendarApi.unselect(); // clear date selection

        calendarApi.addEvent({
          id: createEventId(),
          title: `<strong>${result.nome} - 13h00 - 14h00</strong>`,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });

        console.log({
          id: createEventId(),
          title: `<strong>${result.nome} - 13h00 - 14h00</strong>`,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
        
      });
    }
  }

  onEventClick(calendarEvent) {
    console.log(calendarEvent);
    
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
