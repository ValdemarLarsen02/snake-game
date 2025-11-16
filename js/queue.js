export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    #createNode(data) {
        return { data, next: null };
    }

    enqueue(data) {
        const node = this.#createNode(data);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.count++;
    }

    dequeue() {
        if (!this.head) return undefined;
        const data = this.head.data;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.count--;
        return data;
    }

    peek() {
        return this.head ? this.head.data : undefined;
    }

    size() {
        return this.count;
    }
    
    // Henter data ud fra index
    get(index) {
        if (index < 0 || index >= this.count) return undefined;
        let cur = this.head;
        let i = 0;
        while (i < index) {
            cur = cur.next;
            i++;
        }
        return cur.data;
    }

    // Returnerer en array af alle data i køen
    toArray() {
        const arr = [];
        let cur = this.head;  // head, ikke first!
        while (cur) {
            arr.push(cur.data);  // data, ikke value!
            cur = cur.next;
        }
        return arr;
    }

}
