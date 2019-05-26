package springapp.pet;

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
public class PetResource {

    Logger logger = LoggerFactory.getLogger(PetResource.class);

    @Autowired
    private PetService petManagementService;

    @GetMapping("/api/pets")
    public List<Pet> getAllPets() {
        return petManagementService.findAll();
    }

    @GetMapping("/api/pets/{id}")
    public Pet getPet(@PathVariable Integer id) {
        return petManagementService.findById(id);
    }

    /**
     * return pet list for every client
     */
    @GetMapping("/api/pets/client/{clientId}")
    public List<Pet> getPetsByClient(@PathVariable Integer clientId) {
        return petManagementService.findPetsByClientId(clientId);
    }

    /**
     * return client data
     */
    @GetMapping("/api/pets/client/info/{id}")
    public Object getClientData(@PathVariable Integer id) {
        return petManagementService.getClientDataForPets(id);
    }

    @DeleteMapping("/api/pets/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Integer id) {

        Pet pet = petManagementService.deleteById(id);

        if (pet != null) {
            logger.info(id + " was not null [pet/delete]");
            return ResponseEntity.noContent().build();
        }
        logger.info(id + " not found for [delete]");
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/api/pets/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Integer id, @RequestBody Pet pet) {

        Pet petUpdated = petManagementService.save(pet);

        return new ResponseEntity<Pet>(petUpdated, HttpStatus.OK);
    }

    @PostMapping("/api/pets")
    public ResponseEntity<Void> createPet(@RequestBody Pet pet) {

        Pet createdPet = petManagementService.save(pet);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdPet.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    /**
     * return column names for pets
     */
    @GetMapping("/api/pets/fields")
    public List<String> getClientColNames() {
        return petManagementService.showFields();
    }

}
