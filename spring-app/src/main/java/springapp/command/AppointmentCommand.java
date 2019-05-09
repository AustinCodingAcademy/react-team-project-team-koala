package springapp.command;

import springapp.domain.Appointment;

/**
 * This command class is used to pass information back and force between the
 * client and the server
 * 
 */
public class AppointmentCommand {

	private Integer id;
	private Integer client_id;
	private Integer pet_id;
	private String appt_time;
	private String appt_date;
	private String appt_type;

	/**
	 * Creates a command object that has the initial values the same as the client
	 * passed in
	 * 
	 * @param client the client to initialize the command object with
	 */
	public AppointmentCommand(Appointment appointment) {
		if (appointment != null) {
			id = appointment.getId();
			this.client_id = appointment.getClient_id();
			this.pet_id = appointment.getPet_id();
			this.appt_date = appointment.getAppt_date();
			this.appt_time = appointment.getAppt_time();
			this.appt_type = appointment.getAppt_type();
		}
	}

	public Integer getId() {
		return id;
	}

	public Integer getClient_id() {
		return client_id;
	}

	public Integer getPet_id() {
		return pet_id;
	}

	public String getAppt_time() {
		return appt_time;
	}

	public String getAppt_date() {
		return appt_date;
	}

	public String getAppt_type() {
		return appt_type;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setClient_id(Integer client_id) {
		this.client_id = client_id;
	}

	public void setPet_id(Integer pet_id) {
		this.pet_id = pet_id;
	}

	public void setAppt_time(String appt_time) {
		this.appt_time = appt_time;
	}

	public void setAppt_date(String appt_date) {
		this.appt_date = appt_date;
	}

	public void setAppt_type(String appt_type) {
		this.appt_type = appt_type;
	}

	
}