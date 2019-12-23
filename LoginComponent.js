import Component from "./component.js";
import store from "./store/index.js";
import link from "./link.js";

export default class LoginComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById("login").content.cloneNode(true);
    app.appendChild(template);
    super(store, app);

    document.getElementById("signIn").addEventListener("click", () => {
      const login = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      this.autorization(login, password);
      //link("login"); //settings.redirect
    });
  }

  async autorization(email, password) {
    let response = await fetch("https://todo-app-back.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { token } = await response.json();

    console.log(token);
    if(token) {
        store.dispatch('login', {token});
        window.dispatchEvent(new CustomEvent('changeRoute', {detail: {route: 'list'}}));
    }
  }
  render() {
    console.log("login render");
  }
}
