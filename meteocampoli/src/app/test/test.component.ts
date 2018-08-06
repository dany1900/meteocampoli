import { Component } from "@angular/core";
import { Model, TodoItem } from "model/model";


@Component({
  selector: "test-app",
  templateUrl: "test.component.html"
})
export class TestComponent {
  model = new Model();

  getName() {
    return this.model.user;
  }

  getTodoItems() {
    return this.model.items.filter(item => !item.done);
  }


  addItem(newItem) {
    if (newItem != "") {
      this.model.items.push(new TodoItem(newItem, false));
    }
  }

  geClasses(framework) {
    let classes = {
      red: framework = 'Angular',
      bolder: framework = 'Angular'
    };
    return classes;
  }

  getInlineStyles(framework) {
    let styles = { 'color': framework = 'Angular' ? 'red' : 'green','text-decoration': framework= 'Angular' ? 'underline' : 'none'};
    return styles;
  }

}
