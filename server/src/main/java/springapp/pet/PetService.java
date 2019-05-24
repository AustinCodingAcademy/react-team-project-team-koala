package springapp.pet;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import springapp.client.ClientService;
import springapp.client.Client;

@Service
public class PetService {

  private static List<Pet> pets = new ArrayList<>();
  private static Integer idCounter = 0;

  {
    pets.add(new Pet(++idCounter, "charlie", "M", 1));
    pets.add(new Pet(++idCounter, "kite", "F", 2));
    pets.add(new Pet(++idCounter, "shadow", "M", 1));
  }

  public List<Pet> findAll() {
    return pets;
  }

  public Pet save(Pet pet) {
    if (pet.getId() == -1 || pet.getId() == 0) {
      pet.setId(++idCounter);
      pets.add(pet);
    } else {
      deleteById(pet.getId());
      pets.add(pet);
    }
    return pet;
  }

  public Pet deleteById(Integer id) {
    Pet pet = findById(id);

    if (pet == null)
      return null;

    if (pets.remove(pet)) {
      return pet;
    }

    return null;
  }

  public Pet findById(Integer id) {
    for (Pet pet : pets) {
      if (pet.getId() == id) {
        return pet;
      }
    }

    return null;
  }

  public List<Pet> findPetsByClientId(Integer clientId) {
    List<Pet> clientPetList = new ArrayList<>();
    for (Pet pet : pets) {
      if (pet.getClientId() == clientId) {
        clientPetList.add(pet);
      }
    }
    return clientPetList;
  }

  public Client getClientDataForPets(Integer id) {

    Pet pet = findById(id);
    ClientService cs = new ClientService();
    Client client = cs.findById(pet.getClientId());
    return client;
  }

  /**
   * return all pet attributes
   */
  public List<String> showFields() {
    Pet pet = new Pet();
    Class<?> clazz = pet.getClass();
    List<String> list = new ArrayList<>();
    for (Field field : clazz.getDeclaredFields()) {
      list.add(field.getName());
    }
    return list;
  }
}