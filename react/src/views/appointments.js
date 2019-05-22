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
            <main>
                <form onSubmit={this.addAppointment}>
                        <label> Client ID
                            <input name="clientId" />
                        </label>
                        <label> Pet ID
                            <input name="petId" />
                        </label>
                        <label> Appointment Date 
                            <input name="appt_date" />
                        </label>
                        <label> Appointment Time 
                            <input name="appt_time" />
                        </label>
                        <label> Reason for Visit 
                            <select name="appt_type">
                                <option value="Checkup">General Checkup</option>
                                <option value="Sick">Sick Visit</option>
                                <option value="Vaccinations">Vaccinations</option>
                                <option value="Microchip">Microchip</option>
                            </select>
                        </label>
                        <input type="submit" />
                    </form>
                <ul>
                    {this.state.appointments.map(appointment => <li key={appointment.id}>{appointment.appt_date} {appointment.appt_time} {appointment.appt_time} Client {appointment.client_id} {appointment.appt_type}</li>)}
                </ul>  
            </main>  
        );
    }
}
export default appointment;