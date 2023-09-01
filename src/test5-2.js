const fun = (input) => {

    if ( input == null ) {
        return;
    }

    let arr = [];

    arr.push(input);

    while ( arr.length != 0 ) {
        let node = arr.unshift();
        console.log(node.value);

        if ( node.left != null ) {arr.push(node.left)}
        if ( node.right != null ) {arr.push(node.right)}
    }
}

const name = (params) => {
    let arr = [1, 2, 3, 4, 5];
    for (const item of arr) {
        console.log(item);
        
    }
    
}