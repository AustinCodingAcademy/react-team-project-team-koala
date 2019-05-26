package springapp.appointment;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import springapp.client.ClientService;
import springapp.client.Client;
import springapp.pet.PetService;
import springapp.pet.Pet;

@Service
public class AppointmentService {

    private static List<Appointment> appointments = new ArrayList<>();
    private static Integer idCounter = 0;

    {
        appointments.add(new Appointment(++idCounter, 1, "2019-05-01", "walk-in", "shots"));
        appointments.add(new Appointment(++idCounter, 2, "2019-05-14", "web", "check-up"));
        appointments.add(new Appointment(++idCounter, 1, "2019-05-14", "web", "follow-up"));
    }

    public List<Appointment> findAll() {
        return appointments;
    }

    public Appointment save(Appointment appointment) {
        if (appointment.getId() == -1 || appointment.getId() == 0) {
            appointment.setId(++idCounter);
            appointments.add(appointment);
        } else {
            deleteById(appointment.getId());
            appointments.add(appointment);
        }
        return appointment;
    }

    public Appointment deleteById(Integer id) {
        Appointment appointment = findById(id);

        if (appointment == null)
            return null;

        if (appointments.remove(appointment)) {
            return appointment;
        }

        return null;
    }

    public Appointment findById(Integer id) {
        for (Appointment appointment : appointments) {
            if (appointment.getId() == id) {
                return appointment;
            }
        }

        return null;
    }

    public List<Appointment> findAppointmentsByPetId(Integer petId) {
        List<Appointment> clientAppointmentList = new ArrayList<>();
        for (Appointment appointment : appointments) {
            if (appointment.getPetId() == petId) {
                clientAppointmentList.add(appointment);
            }
        }
        return clientAppointmentList;
    }

    public Client getClientDataForAppointments(Integer id) {

        Appointment appointment = findById(id);
        PetService ps = new PetService();
        Pet pet = ps.findById(appointment.getPetId());
        ClientService cs = new ClientService();
        Client client = cs.findById(pet.getClientId());
        return client;
    }

    /**
     * use java reflection to discover all field names for appointments
     */
    public List<String> showFields() {
        Appointment appointment = new Appointment();
        Class<?> objFields = appointment.getClass();
        List<String> list = new ArrayList<>();
        for (Field field : objFields.getDeclaredFields()) {
            list.add(field.getName());
        }
        return list;
    }
}
