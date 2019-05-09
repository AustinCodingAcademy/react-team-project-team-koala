package springapp.domain;

public class AppointmentClientPet {
	private final Appointment appointment;
	private final String client_name;
	private final String pet_name;
	
	public AppointmentClientPet(Appointment appointment, String client_name, String pet_name) {
		this.appointment = appointment;
		this.client_name = client_name;
		this.pet_name = pet_name;
	}

	public Appointment getAppointment() {
		return appointment;
	}
	
	public String getClient_name() {
		return client_name;
	}

	public String getPet_name() {
		return pet_name;
	}
}