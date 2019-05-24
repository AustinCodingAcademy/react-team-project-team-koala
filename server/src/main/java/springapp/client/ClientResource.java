package springapp.client;

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
public class ClientResource {

	@Autowired
	private ClientService clientManagementService;

	@GetMapping("/api/clients")
	public List<Client> getAllClients() {
		return clientManagementService.findAll();
	}

	@GetMapping("/api/clients/{id}")
	public Client getClient(@PathVariable Integer id) {
		return clientManagementService.findById(id);
	}

	/**
	 * return list of client id and client name only (use for input selects)
	 */
	@GetMapping("/api/clients/all")
	public List<Object> getClient() {
		return clientManagementService.getActiveClients();
	}

	@DeleteMapping("/api/clients/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable Integer id) {

		Client client = clientManagementService.deleteById(id);

		if (client != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/api/clients/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client client) {

		Client clientUpdated = clientManagementService.save(client);

		return new ResponseEntity<Client>(clientUpdated, HttpStatus.OK);
	}

	@PostMapping("/api/clients")
	public ResponseEntity<Void> createClient(@RequestBody Client client) {

		Client createdClient = clientManagementService.save(client);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdClient.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}

	/** return column names for client */
	@GetMapping("/api/clients/fields")
	public List<String> getClientColNames() {
		return clientManagementService.showFields();
	}

}