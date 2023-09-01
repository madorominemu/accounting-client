// 使用JS实现一个链表：插入一个值add（value）、根据value删除值：remove（value）、获取链表长度：getSize（）
// 注：值可以使用整型数据

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.end = null;
    this.len = 0;
  }

  add(val) {
    let node = new Node(val);

    if ( !this.head ) {
      this.head = node;
      this.end = node;
    }else {
      this.end.next = node;
      this.end = node;
    }
  }
  //[1,2,3,4,5]
  remove(val) {
    let head = this.head;
    let node = null;

    while ( head ) {
      if (head.val === val) {

      }
    }

  }
}