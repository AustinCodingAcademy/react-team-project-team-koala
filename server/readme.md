# server

-   **@RestController**: Tells Spring that this is a controller class. This is a convenient annotation that combines the behavior of both `@Controller` and `@ResponseBody` into one. It creates a map of our model object and returns the object and the object data directly into the HTTP response as JSON or XML.
-   **@Autowired**: To call the bean ‘groceryListRepository’. It will be used to handle our data.
-   **@CrossOrigin**: You do not have to worry about this annotation yet as we use it for Part 2 of this tutorial. But we use it to get our front-end React domain to be able to request the method.
-   **@RequestBody**: Maps the HTTP request body to a domain object, essentially our Java entity object. The RequestBody is usually in JSON format and contains the data that can be updated or stored.
-   **@GetMapping**: We use this for our GET request to get all the items from our MySQL database. Here we create a new ArrayList in which we store every item from our database by using the findAll() method provided by JpaRepository. The path is set to ‘/items’, when the user request for a GET on http://localhost:8080/items (in my case http://localhost:8181/items, because I set my port to 8181 in the application.properties files) they get back an ArrayList of all our items.
-   **@PostMapping**: We are using the PostMapping annotation for our POST request to be able to save a new item to our database. Here we use the RequestBody annotation so that we can save the data we entered in using the method save() provided by JpaRepository.
-   **@DeleteMapping**: Our DeleteMapping annotation uses curly braces in our path (path = “/items{id}”), this indicates a variable for our @PathVariable annotation. Path variables are variables in the URL. In this case we want to delete the item with the ID we pass in the curly braces by using the method deleteById() provided by JpaRepository.

https://medium.com/@falkohussain/basic-rest-api-application-using-spring-boot-react-and-mysql-part-i-the-back-end-e79028f8a67b

## setting up spring security

https://www.baeldung.com/spring-security-login

### REST Requests

-   https://stackoverflow.com/a/256359/7460613
-   https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/

| Request           | Description                                                                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`             | This request is used to get a resource from a server. If you perform a `GET` request, the server looks for the data you requested and sends it back to you. In other words, a `GET` request performs a `READ` operation. This is the default request method.                    |
| `POST`            | This request is used to create a new resource on a server. If you perform a `POST` request, the server creates a new entry in the database and tells you whether the creation is successful. In other words, a `POST` request performs an `CREATE` operation.                   |
| `PUT` and `PATCH` | These two requests are used to update a resource on a server. If you perform a `PUT` or `PATCH` request, the server updates an entry in the database and tells you whether the update is successful. In other words, a `PUT` or `PATCH` request performs an `UPDATE` operation. |
| `DELETE`          | This request is used to delete a resource from a server. If you perform a `DELETE` request, the server deletes an entry in the database and tells you whether the deletion is successful. In other words, a `DELETE` request performs a `DELETE` operation.                     |

<caption>

resource: [Understanding And Using REST APIs
](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)

</caption>

### `PUT` vs `POST` requests

-   use `POST` to get a list of something (i.e. `/api/clients`)
-   use `PUT` to get a particular item in the list (i.e. `/api/clients/1` - with 1 being the `{id}`)

> If the URL is **not** yet created, **you should not be using POST to create it while specifying the name**. This should result in a 'resource not found' error because <new_question> does not exist yet. You should PUT the <new_question> resource on the server first.[1]

[1]: https://stackoverflow.com/a/630475/7460613

references:

-   https://stackoverflow.com/a/630475/7460613

The PUT method completely replaces whatever currently exists at the target URL with something else. With this method, you can create a new resource or overwrite an existing one given you know the exact Request-URI. An example of a PUT method being used to create a new resource would resemble the following:

`PUT /forums/<new_thread> HTTP/2.0`
Host: https://yourwebsite.com/
Where <new_thread> would be the actual name or ID number of the thread. Alternatively, a PUT method used to overwrite an existing resource could look like this:

`PUT /forums/<existing_thread> HTTP/2.0`
Host: https://yourwebsite.com/
In short, the PUT method is used to create or overwrite a resource at a particular URL that is known by the client.

What Does the POST Method Do?#
The HTTP POST method is used to send user-generated data to the web server. For example, a POST method is used when a user comments on a forum or if they upload a profile picture. A POST method should also be used if you do not know the specific URL of where your newly created resource should reside. In other words, if a new forum thread is created and the thread path is not specified then you could use some like:

POST /forums HTTP/2.0
Host: https://yourwebsite.com/
Using this method, the URL path would be returned from the origin server and you would receive a response similar to:

HTTP/2.0 201 Created
Location: /forums/<new_thread>
In short, the POST method should be used to create a subordinate (or child) of the resource identified by the Request-URI. In the example above, the Request-URI would be /forums and the subordinate or child would be <new_thread> as defined by the origin.
