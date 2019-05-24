package springapp.appointment;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class AppointmentResource {

  @Autowired
  private AppointmentService appointmentManagementService;

  @GetMapping("/api/appointments")
  public List<Appointment> getAllAppointments() {
    return appointmentManagementService.findAll();
  }

  @GetMapping("/api/appointments/{id}")
  public Appointment getAppointment(@PathVariable Integer id) {
    return appointmentManagementService.findById(id);
  }

  /**
   * return appointment list for every client
   */
  @GetMapping("/api/appointments/client/{clientId}")
  public List<Appointment> getAppointmentsByClient(@PathVariable Integer clientId) {
    return appointmentManagementService.findAppointmentsByPetId(clientId);
  }

  /**
   * return client data for appointment
   */
  @GetMapping("/api/appointments/client/info/{id}")
  public Object getClientData(@PathVariable Integer id) {
    return appointmentManagementService.getClientDataForAppointments(id);
  }

  @DeleteMapping("/api/appointments/{id}")
  public ResponseEntity<Void> deleteAppointment(@PathVariable Integer id) {

    Appointment appointment = appointmentManagementService.deleteById(id);

    if (appointment != null) {
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/api/appointments/{id}")
  public ResponseEntity<Appointment> updateAppointment(@PathVariable Integer id, @RequestBody Appointment appointment) {
    Appointment appointmentUpdated = appointmentManagementService.save(appointment);
    return new ResponseEntity<Appointment>(appointmentUpdated, HttpStatus.OK);
  }

  @PostMapping("/api/appointments")
  public ResponseEntity<Void> createAppointment(@RequestBody Appointment appointment) {

    Appointment createdAppointment = appointmentManagementService.save(appointment);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdAppointment.getId())
        .toUri();

    return ResponseEntity.created(uri).build();
  }

  /**
   * return column names for client
   */
  @GetMapping("/api/appointments/fields")
  public List<String> getClientColNames() {
    return appointmentManagementService.showFields();
  }

}