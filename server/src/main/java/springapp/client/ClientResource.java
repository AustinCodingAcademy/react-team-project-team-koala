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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ClientResource {

    Logger logger = LoggerFactory.getLogger(ClientResource.class);

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
     * return a list with only client id and client name
     */
    @GetMapping("/api/clients/name")
    public List<Object> getClient() {
        return clientManagementService.getActiveClients();
    }

    // TODO: update clients table to reflect pet deletes

    @DeleteMapping("/api/clients/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {

        Client client = clientManagementService.deleteById(id);

        if (client != null) {
            logger.info(id + " was not null [client/delete]");
            return ResponseEntity.noContent().build();
        }
        logger.info(id + " not found for [client/delete]");
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

    /**
     * return column names for clients
     */
    @GetMapping("/api/clients/fields")
    public List<String> getClientColNames() {
        return clientManagementService.showFields();
    }

}
