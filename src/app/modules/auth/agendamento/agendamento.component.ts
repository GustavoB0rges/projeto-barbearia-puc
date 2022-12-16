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
  dataSourceAgendamento: any[] = [];

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
    this.events = [...this.events];
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  onSave(): void {
    
  }

  onRefresh(): void {
     this.agendamentoService.read().subscribe(agendamento => {
      this.dataSourceAgendamento = agendamento;

      this.dataSourceAgendamento = this.dataSourceAgendamento.map(element => element = {
        id: element.id,
        title: element.nome_cliente,
        description: 'Agendamento',
        duration: null,
        start: element.dt_ini,
        end: element.dt_fim,
        backgroundColor: 'green',
      })
      
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        locale: 'pt-br',
        eventClick: this.onEventClick.bind(this),
        events: this.dataSourceAgendamento
      };
    });
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

  openDialog(selectInfo?: DateSelectArg, data?, operation?): void {
    if (data) {
      operation = 'view'
    } else {
      operation = 'new';
    }
    this.handleDateSelect(selectInfo, data, operation)
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg, data?, operation?) {
    this._dialog.open(DialogContentComponent, {
      maxHeight: '80vh',
      maxWidth: '95vh',
      height: AUTO_STYLE,
      width: window.innerWidth < 900 ? '95%' : '50%',
      disableClose: true,
      data: { data, operation: operation },
    }).afterClosed().subscribe((result) => {
      this.onRefresh();
    });
  }

  onEventClick(value) {
    this.agendamentoService.readByid(value.event.id).subscribe(response => {
      this.openDialog(null, response, 'view')
    })
    
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
