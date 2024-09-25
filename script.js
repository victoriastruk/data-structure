//1
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  deleteItem(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }
  addNthElement(data, position) {
    const newNode = new Node(data);

    if (position === 0 || !this.head) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let index = 0;

    while (current.next && index < position) {
      current = current.next;
      index++;
    }
    newNode.next = current.next;
    current.next = newNode;
  }
  printList() {
    let current = this.head;
    let list = "";

    while (current) {
      list += current.data;
      if (current.next) {
        list += " -> ";
      }
      current = current.next;
    }

    console.log(list);
  }
}

const list = new LinkedList();
list.add(5);
list.add(2);
list.add(6);
list.add(4);
list.add(3);

console.log("Початковий список:");
list.printList();

list.deleteItem(2);
console.log("Список після видалення 2:");
list.printList();

list.addNthElement(9, 1);
console.log("Список після додавання 9 після 1-ї позиції:");
list.printList();

//2
class myCollection {
  constructor() {
    (this.collection = {}), (this.counter = 1);
  }

  add(value) {
    const key = `*${this.counter}*`;
    this.collection[key] = value;
    this.counter++;
  }

  del(number) {
    const key = `*${number}*`;
    if (this.collection[key]) {
      delete this.collection[key];
    } else {
      console.log(`Eлемент з ключем ${number} не існує.`);
    }
  }

  //3*
  [Symbol.iterator]() {
    const entries = Object.entries(this.collection);
    let index = 0;

    return {
      next: () => {
        if (index < entries.length) {
          const [key, value] = entries[index++];
          return { value: `${key}: ${value}`, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

const collection1 = new myCollection();
collection1.add("first value");
collection1.add("second value");
collection1.add("third value");
console.log("Виведення колекції за допомогою циклу for...of:");
for (let value of collection1) {
  console.log(value);
}

//4
function checkSequence(str) {
  let pairs = [
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
    ["<", ">"],
  ];
  let stack = [];
  let bracketsMap = {};

  for (let i = 0; i < pairs.length; i++) {
    let [open, close] = pairs[i];
    bracketsMap[open] = close;
  }

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (bracketsMap[char]) {
      stack.push(char);
    } else {
      let lastOpened = stack.pop();
      if (bracketsMap[lastOpened] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
debugger;
console.log(checkSequence("()(([]))")); // true
console.log(checkSequence("{][)")); // false
