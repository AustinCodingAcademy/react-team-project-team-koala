package springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
@Controller
@RequestMapping("/appointments") // notice that this path is set at the class level.
public class AppointmentController {

	// Inject in a ClientService class
	@Autowired
	AppointmentService appointmentService;
	
	@Autowired
	PetService petService;

	@PreAuthorize("hasAuthority('LIST_CLIENTS')")
	@GetMapping
	public String listAppointments(Model model) {
		List<AppointmentClientPet> apptClientPetList = appointmentService.getApptClientPetList();
		model.addAttribute("apptClientPetList", apptClientPetList);
		return "appointments/listAppointments";
	}
	
	 @PreAuthorize("hasAuthority('GET_CLIENT')")
	 @GetMapping("/{id}")
	 public String getAppointment(@PathVariable("id") String id, Model model, boolean saved) {

		model.addAttribute("saved", saved);
	    if(id.equals("new")) {
	     model.addAttribute("command", new AppointmentCommand(null));	
		
	    } else {
	        // since we have a valid id, get the client object from the service
			Appointment appointment = appointmentService.getAppointment(Integer.parseInt(id));
			// we create a client command that can be used when the browser sends the save object
			model.addAttribute("command", new AppointmentCommand(appointment));
			
			AppointmentClientPet apptClientPet = appointmentService.getApptClientPet(id);
			model.addAttribute("client_name", apptClientPet.getClient_name());
			model.addAttribute("pet_name", apptClientPet.getPet_name());
		}
		return "appointments/editAppointments";
	}
	 

	 /**
     * Saves the updates to an appointment based on the command that was sent from the appointment side
     * @param command the command corresponding with how the appointment object should be updated/created
     * @param redirectAttributes holds the attributes that we may want to pass to the get page after a save
     * @return the edit appointment view template
     */
	 @PreAuthorize("hasAuthority('SAVE_APPOINTMENT')")
	 @PostMapping
	 public String saveAppointment(AppointmentCommand command, RedirectAttributes redirectAttributes) {

	     //NOTE: if we want to capture errors correctly, we would wrap the following code in a try/catch
         // and the catch would add a nice error message to the mode
         // then the view template would render a nice error message

	     // we pass the command to the service, and it nows how update/create an appointment
         // the service returns the new appointment object back to us after the save
	     Appointment appointment = appointmentService.saveAppointment(command);

	     // we add in a "saved" attribute so we can print a nice message indicating a save was successfull
		 redirectAttributes.addAttribute("saved", true);


	     return "redirect:/appointments/"+appointment.getId();

     }

	 /**
     * Deletes an appointment and redirects to list appointments page
     * @param id the id of the appointment to delete
     * @param redirectAttributes we use this instead of a Model object, because we want to pass
     *                           some attributes to the list page
     * @return redirect path to the list appointments page
     */
     @PreAuthorize("hasAuthority('DELETE_APPOINTMENT')")
	 @GetMapping("/{id}/delete")
	 public String deleteAppointment(@PathVariable("id") String id, RedirectAttributes redirectAttributes) {
         // NOTE to handle exceptions, we would wrap the following code in a try/catch
         // and in the catch forward to a different page

         // send the id passed in to the appointment service
         appointmentService.deleteAppointment(id);

         // add an attribute to the list page, so a nice message can be shown
         redirectAttributes.addFlashAttribute("deleted", true);

         // redirect to list appointments path/page
         return "redirect:/appointments";
    } 

}