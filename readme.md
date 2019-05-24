# about

TODO: organize readme file

color scheme:

```
$primary:       #3755BE;
$primary-2:     #FF8E88;
$primary-3:     #1B1F3B;
```

## what happens when you refresh the page…

…the App reverts back to its initial state! We aren’t using the stored items yet, just saving them in the background. Not terribly helpful…

In order to persist the app’s state even after refreshing the page, we need to hydrate the App‘s state with the values in `localStorage`, with help from a couple new methods:

-   `localStorage.getItem()` — takes a storage key and returns the value saved under that key.
-   `JSON.parse()` — converts a JSON string into a JavaScript value. You need this to correctly retrieve objects and arrays that were saved as strings to `localStorage`.

[How to take advantage of Local Storage in your React projects]

<mark>JWT is a better option than using localstorage but this way is easier</mark>

---

## notes on .bind()

In Class Components in React, when we pass the event handler function reference as a callback like this:

    <button type="button" onClick={this.handleClick}>Click Me</button>

the event handler method loses its implicitly bound context. When the event occurs and the handler is invoked, the `this` value falls back to default binding and is set to **undefined** , as class declarations and prototype methods run in strict mode.

-   When we bind the `this` of the event handler to the component instance in the constructor, we can pass it as a callback without worrying about it losing its context.
-   Arrow functions are exempt from `this` behavior because they use lexical `this` binding which automatically binds them to the scope they are defined in.

[](https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb)

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isToggleOn: true }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }))
    }

    render() {
        return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    }
}

ReactDOM.render(<Toggle />, document.getElementById('root'))
```

You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind `this.handleClick` and pass it to onClick, this will be undefined when the function is actually called.

[React: Handling Events](https://reactjs.org/docs/handling-events.html)

The `componentDidMount()` method runs after the component output has been rendered to the DOM

```jsx
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

1.  When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2.  React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.
3.  When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` method once a second.
4.  Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
5.  If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stoppe

[React: State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

```jsx
// Wrong
this.setState({
    counter: this.state.counter + this.props.increment
})
/*
To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
*/

// Correct
this.setState((state, props) => ({
    counter: state.counter + props.increment
}))
```

```jsx
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

`componentDidUpdate()`is invoked immediately after updating occurs. This method is not called for the initial render.

-   Use this as an opportunity to operate on the DOM when the component has been updated.
-   <mark>This is also a good place to do network requests as long as you compare the current props to previous props</mark> (e.g. a network request may not be necessary if the props have not changed).

`componentWillUnmount()`is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

## https://reactjs.org/docs/react-component.html

helpful resources:

-   https://www.baeldung.com/httpclient-4-basic-authentication
-   https://github.com/axios/axios
-   https://www.springboottutorial.com/spring-boot-react-full-stack-crud-maven-application
-   https://medium.com/@bitshadow/how-basic-http-authentication-and-session-works-d29af9caec31
-   https://www.mkyong.com/spring-boot/spring-rest-hello-world-example/
-   https://www.robinwieruch.de/react-fetching-data/ -https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

API:
http://localhost:8080/basicauth
localhost:8080/

---

[Explanation of Annotations]

1. **RestController**: This annotation is used to denote every method in the annotated class as Domain Object. They are usually represented by entities and value objects related to the endpoint we are giving to get the data from the database.

2. **Autowired**: This annotation is used to wire the bean classes automatically.

The following are the Mapping Annotations for the endpoints to perform CRUD Operations.

3. **GetMapping**: This is an interface which contains the path of the endpoint to perform a Get method. This GetMapping interface uses the RequestMapping interface which can have the “path, value, params, headers” method to perform the Get method in earlier Spring versions.

4. **PostMapping**: This is an interface which contains the path of the endpoint to perform the Post method.

5. **PutMapping**: This is an interface which contains the path of the endpoint to perform the Put method to Update.

6. **DeleteMapping**: This is an interface which contains the path of the endpoint to perform the Delete method.

[explanation of annotations]: https://medium.freecodecamp.org/how-to-build-a-rest-api-with-spring-boot-using-mysql-and-jpa-f931e348734b
[how to take advantage of local storage in your react projects]: https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

theme inspired by:
https://leap.mediumra.re/documentation/how-to-edit-color-scheme.html
