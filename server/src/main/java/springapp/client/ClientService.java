package springapp.client;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ClientService {

    private static List<Client> clients = new ArrayList<>();
    private static Integer idCounter = 0;

    {
        clients.add(new Client(++idCounter, "Annie", "832-333-4444", "123 One Way", "annie@me.com"));
        clients.add(new Client(++idCounter, "Spagon", "123-456-7899", "1234 Address", "spagon@me.com"));
        clients.add(new Client(++idCounter, "Betty", "832-000-0000", "123 Sunset Blvd", "betty@me.com"));

    }

    public List<Client> findAll() {
        return clients;
    }

    public Client save(Client client) {
        if (client.getId() == -1 || client.getId() == 0) {
            client.setId(++idCounter);
            clients.add(client);
        } else {
            deleteById(client.getId());
            clients.add(client);
        }
        return client;
    }

    public Client deleteById(Integer id) {
        clients.remove(findById(id));

        return findById(id);
    }

    public Client findById(Integer id) {
        for (Client client : clients) {
            if (client.getId() == id) {
                return client;
            }
        }

        return null;
    }

    public List<Object> getActiveClients() {
        List<Object> clientProfile = new ArrayList<>();
        for (Client client : clients) {
            String[] clientArr = { client.getId().toString(), client.getName() };
            clientProfile.add(clientArr);
        }
        return clientProfile;
    }

    /**
     * use java reflection to discover all field names for clients
     */
    public List<String> showFields() {
        Client client = new Client();
        Class<?> objFields = client.getClass();
        List<String> list = new ArrayList<>();
        for (Field field : objFields.getDeclaredFields()) {
            list.add(field.getName());
        }
        return list;
    }
}
