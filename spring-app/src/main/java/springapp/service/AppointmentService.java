package springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springapp.command.AppointmentCommand;
import springapp.dao.AppointmentDao;
import springapp.dao.PetDao;
import springapp.domain.Appointment;
import springapp.domain.AppointmentClientPet;;

@Service
public class AppointmentService {

	@Autowired
	AppointmentDao appointmentDao;
	
	@Autowired
	PetDao petDao;

	public List<Appointment> getAppointments() {
		return appointmentDao.list();
	}
	
	public Appointment getAppointment(Integer id) {
		return appointmentDao.get(id);
	}
	
	public List<AppointmentClientPet> getApptClientPetList() {
		return appointmentDao.getApptClientPetList();
	}
	
	public AppointmentClientPet getApptClientPet(String id) {
		return appointmentDao.getApptClientPet(id);
	}
	
	public void deleteAppointment(String id) {
		appointmentDao.delete(Integer.parseInt(id));
	}

	public Appointment saveAppointment(AppointmentCommand toSave) {
		Appointment appointment= new Appointment(toSave.getId(), toSave.getClient_id(), toSave.getPet_id(), toSave.getAppt_time(), toSave.getAppt_date(), toSave.getAppt_type());

		return appointmentDao.save(appointment);
	}
}