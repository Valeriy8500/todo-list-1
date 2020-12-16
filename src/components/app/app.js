import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {

  maxid = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  };

  filteButtonDone = () => {
    this.setState(({ todoData }) => {
      const filteredArray = [...todoData].filter((item) => {
        if (item.done) {
          return item;
        }
      });

      return {
        todoData: filteredArray
      }
    })
  }

  filteButtonActive = () => {
    this.setState(({ todoData }) => {
      const filteredArray = [...todoData].filter((item) => {
        if (!item.done) {
          return item;
        }
      });

      return {
        todoData: filteredArray
      }
    })
  }

  filteButtonAll = () => {
    this.setState(({ todoData }) => {
      const filteredArray = [...todoData].map((item) => {
        return item;
      });

      return {
        todoData: filteredArray
      }
    })
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxid++
    }
  };

  addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text);

    // add element in array
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    // update Object
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    // construct new array
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onSearchChange = (term) => {
    this.setState({ term: term });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    })
  };

  render() {

    const { todoData, term } = this.state;

    const visibleItems = this.search(todoData, term);

    const doneCount = todoData.filter((el) => {
      return el.done === true;
    }).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader
          toDo={todoCount}
          one={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filtersDone={this.filteButtonDone}
            filtersActive={this.filteButtonActive}
            filtersAll={this.filteButtonAll} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant} />

        <ItemAddForm
          add={this.addItem} />
      </div>
    )
  };

};
