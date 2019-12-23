import Component from "./component.js";
import store from "./store/index.js";

const LIST_FILTER_TYPES = {
  ALL: "all",
  ONLY_DONE: "only-done",
  ONLY_UNDONE: "only-undone"
};

export default class ListComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById("list").content.cloneNode(true);
    app.append(template);
    super(store, document.querySelector(".js-items"));
    const input = document.querySelector(".c-input-field");
    const submit = document.querySelector(".c-button");

    const handleClick = event => {

      event.preventDefault();

      let value = input.value.trim();

      if (value.length) {
        store.dispatch("addItem", { text: value, done: false });

        createBack(value, false, state.userInfo);
        input.focus();
      }
    };
    submit.addEventListener("click", handleClick);

    document.getElementById("all-button").addEventListener("click", () => {
      store.dispatch("changeListFilter", LIST_FILTER_TYPES.ALL);
    });

    document
      .getElementById("only-done-button")
      .addEventListener("click", () => {
        store.dispatch("changeListFilter", LIST_FILTER_TYPES.ONLY_DONE);
      });

    document
      .getElementById("only-undone-button")
      .addEventListener("click", () => {
        store.dispatch("changeListFilter", LIST_FILTER_TYPES.ONLY_UNDONE);
      });
  }

     createBack(textToDo, done, userInfo) {
      console.log('createBack')
        //let response = await
         fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'POST',
            body:
                JSON.stringify({
                    text: textToDo,
                    completed: done,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.userInfo.token
            }
        })



    }

  render() {
    if (store.state.todo.length == 0) {
      this.anchor.innerHTML = `No todo's`;
      return;
    }

    let allToDo = 0;
    let doneToDo = 0;
    let undoeToDo = 0;
      store.state.todo.forEach((element) => {
          allToDo++;
          if(element.done) doneToDo++;
          if(!element.done) undoeToDo++;

      })

      const TekstDone = document.getElementById("done-tasks");
      TekstDone.innerText = ' ' + doneToDo + " task";
      const Tekstundone = document.getElementById('undone-tasks');
      Tekstundone.innerText = undoeToDo ;
      const TekstAll = document.getElementById('all-tasks');
      TekstAll.innerText = allToDo ;

    this.anchor.innerHTML = `
            <ul>
            ${store.state.todo
              .map(todoItem => {
                const { filter } = store.state;

                if (filter === LIST_FILTER_TYPES.ONLY_UNDONE && todoItem.done) {
                    
                  return "";
                }

                if (filter === LIST_FILTER_TYPES.ONLY_DONE && !todoItem.done) {
                    
                  return "";
                }

                return `
            <li><span class="todo-text${
              todoItem.done ? " todo-crossed" : ""
            }" contenteditable="true">${
                  todoItem.text
                }</span><input class="change-done" type="checkbox"${
                  todoItem.done ? " checked" : ""
                }><button class="delete-button" type="button">X</button></li>
        `;
              })
              .join("")}
</ul>
`;
    this.anchor.querySelectorAll(".delete-button").forEach((
      button,
      id // this.anchor.querySelectorAll(selectors: 'button').forEach(callbackfn: (button:TNode, id:number) =>
    ) =>
      button.addEventListener("click", () =>
        store.dispatch("removeItem", { id })
      )
    );

    this.anchor.querySelectorAll(".todo-text").forEach((
      todo,
      id // this.anchor.querySelectorAll(selectors: 'button').forEach(callbackfn: (button:TNode, id:number) =>
    ) =>
      todo.addEventListener("blur", event => {
        store.dispatch("changeItem", {
          id,
          value: {
            text: event.target.innerHTML,
            done: store.state.todo[id].done
          }
        });
      })
    );

    this.anchor.querySelectorAll(".change-done").forEach((
      checkbox,
      id // this.anchor.querySelectorAll(selectors: 'button').forEach(callbackfn: (button:TNode, id:number) =>
    ) =>
      checkbox.addEventListener("change", event => {
        store.dispatch("changeItem", {
          id,
          value: { text: store.state.todo[id].text, done: event.target.checked }
        });
      })
    );
  }
}
