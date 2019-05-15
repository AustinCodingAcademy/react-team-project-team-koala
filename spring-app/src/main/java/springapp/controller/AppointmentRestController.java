package springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import springapp.command.AppointmentCommand;
import springapp.domain.Appointment;
import springapp.domain.AppointmentClientPet;
import springapp.service.AppointmentService;
import springapp.service.PetService;

/**
 * This controller handles all client related pages
 *
 * Notice the @PreAuthorize annotations on the methods
 */
@RestController
@RequestMapping("/api/appointments") // notice that this path is set at the class level.
public class AppointmentRestController {

	// Inject in a ClientService class
	@Autowired
	AppointmentService appointmentService;
	
	@Autowired
	PetService petService;

	@PreAuthorize("hasAuthority('LIST_CLIENTS')")
	@GetMapping

	public List<Appointment> listAppointments(){
		return appointmentService.getAppointments();
	}
	
	 @PreAuthorize("hasAuthority('GET_CLIENT')")
	 @GetMapping("/{id}")
	 public Appointment getAppointment(@PathVariable("id") int id) {
		Appointment appointment = appointmentService.getAppointment(id);
		return appointment;
	}
	 

	 /**
     * Saves the updates to an appointment based on the command that was sent from the appointment side
     * @param command the command corresponding with how the appointment object should be updated/created
     * @param redirectAttributes holds the attributes that we may want to pass to the get page after a save
     * @return the edit appointment view template
     */
	 @PreAuthorize("hasAuthority('SAVE_APPOINTMENT')")
	 @PostMapping
	 public Appointment newAppointment(AppointmentCommand command) {
		 if (command.getId() != null) {
			 throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Cannot pass in a client id when creating a new client");
		 }

	     Appointment appointment = appointmentService.saveAppointment(command);
	     return appointment;
     }

	 
     @PreAuthorize("hasAuthority('DELETE_APPOINTMENT')")
	 @DeleteMapping("/{id}")
	 public Appointment deleteAppointment(@PathVariable("id") String id, RedirectAttributes redirectAttributes) {
         // redirect to list appointments path/page
         return appointmentService.deleteAppointment(id);
    } 

}