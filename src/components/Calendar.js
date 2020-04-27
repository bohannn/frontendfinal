import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';

import moment from 'moment';

export default function MyCalendar() {

  const [state, setState] = useState([
    {
      title: '',
      startDate: '',
      endDate: '',
    }
  ])

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      return setState(
        responseData.map((data) => ({
          startDate: new Date(moment(data.date)),
          endDate: new Date(moment(data.date).add(data.duration, "minutes")),
          title: data.activity + " / " + data.customer.firstname + " " + data.customer.lastname,
        }))
      );
    })
    .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <div>
        <Paper>
          <Scheduler data={state} height={660}>
            <ViewState 
              defaultCurrentDate={new Date()}
              defaultCurrentViewName="Week"
            />
            <DayView 
              name="Day"
              startDayHour={8}
              endDayHour={23}
            />
            <WeekView
              name="Week"
              startDayHour={8}
              endDayHour={23}
            />
            <MonthView 
              name="Month"
              startDayHour={8}
              endDayHour={23}
            />

            <Toolbar />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
      </div>
    </div>
  );
}

