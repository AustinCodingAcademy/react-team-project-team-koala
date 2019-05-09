package springapp.domain;

public class Appointment {
	private final Integer id;
	private final Integer client_id;
	private final Integer pet_id;
	private final String appt_time;
	private final String appt_date;
	private final String appt_type;
	
	public Appointment(Integer id, Integer client_id, Integer pet_id, String appt_time, String appt_date, String appt_type) {
		this.id = id;
		this.client_id = client_id;
		this.pet_id = pet_id;
		this.appt_time = appt_time;
		this.appt_date = appt_date;
		this.appt_type = appt_type;
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
	
	
}