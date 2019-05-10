import React from 'react';

class appointment extends React.Component {

    state = {
        appointments: []
    }

    componentDidMount = () => {
        this.fetchAppointments()
    }

    fetchAppointments = async() => {
    const response = await fetch('/api/appointments')
    const appointments = await response.json()
    this.setState({ appointments: appointments })
    }

    render() {
        return (
            <ul>
                {this.state.appointments.map(appointment => <li key={appointment.id}>{appointment.appt_date} {appointment.appt_time} {appointment.appt_time} Client {appointment.client_id} {appointment.appt_type}</li>)}
            </ul>    
        );
    }
}
export default appointment;