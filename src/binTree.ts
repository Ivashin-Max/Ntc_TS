import { Leaf } from "./leaf";

export class Tree<T> {

  constructor(public start: Leaf<T> | null){
  this.start = null;
  }


   add(value: T): void {
   const newLeaf = new Leaf<T>(value, null, null);


   if (!this.start) {
     this.start = newLeaf;
   } else {
     this.addLeaf(this.start, newLeaf, value);
   }
  }

  private addLeaf(leaf: Leaf<T>, newLeaf: Leaf<T>, value: T): void {
    const double = this.checkValue(value);
    if (double){
      alert("Нельзя вводить повторные значения");
    } else {
    if (newLeaf.value < leaf.value) {
        if (leaf.left === null) {
            leaf.left = newLeaf;
        } else {
            this.addLeaf(leaf.left, newLeaf, value);
        }
    } else {
        if (leaf.right === null) {
            leaf.right = newLeaf;
        } else {
            this.addLeaf(leaf.right, newLeaf, value);
        }
    }
  }
}

findMinLeaf(leaf: Leaf<T>): Leaf<T> {
  console.log(`Ищу`, leaf);

  if (leaf.left === null) {
    console.log(`Нашел`, leaf);
    return leaf;
  }
  return this.findMinLeaf(leaf.left);
}

removeValue(value: T): void {
  this.start = this.removeLeaf(this.start, value);
}

removeLeaf(leaf: Leaf<T> | null, value: T): Leaf<T> | null {
  console.log(`Хотим удалить-${value}, начинаю поиск`);
  if (leaf === null) {
    console.log(`leaf === null`);
      return null;
  }
  if (value < leaf.value) {
    console.log(`${value} < ${leaf.value}`);
      leaf.left = this.removeLeaf(leaf.left, value);
      return leaf;
  }
  if (value > leaf.value) {
    console.log(`${value} > ${leaf.value}`);
      leaf.right = this.removeLeaf(leaf.right, value);
      return leaf;
  }

      if (leaf.left === null && leaf.right === null) {
        console.log(`leaf.left === null && leaf.right === null`);

          leaf = null;
          return leaf;
      }

      if (leaf.left === null) {
        console.log(`leaf.left === null`);
        console.log(`leaf = `, leaf.right);
          leaf = leaf.right;
          return leaf;
      } if (leaf.right === null) {
        console.log(`leaf.right === null`);
        console.log(`leaf = `, leaf.left);
          leaf = leaf.left;
          return leaf;
      }

      const newleaf = this.findMinLeaf(leaf.right);
      console.log(`Search min Leaf, min leaf = `, newleaf);
      leaf.value = newleaf.value;
      leaf.right = this.removeLeaf(leaf.right, newleaf.value);
      return leaf;
}


 checkValue(value: unknown): boolean{
  const allLeafs = this.countLevels().flat();

  for (const leaf of allLeafs) {
    if (Number(value) === Number(leaf)){
      return true;
    }
  }
  return false;
}

 countLevels(): [][] | T[][] {
   console.log("countLevels-----------");
    const levels: T[][] = [];

    if (!this.start) {
        return [];
    }

    const queue = [this.start];
    while (queue.length){
      const queueLength = queue.length;
      const level: T[] = [];

       for (let i = 0; i < queueLength; i++){

           const leaf = queue.shift();

           if (leaf?.left){
               queue.push(leaf.left);
           }
           if (leaf?.right){
               queue.push(leaf.right);
           }
           if (leaf !== undefined){
           level.push(leaf?.value);
           }
       }

      levels.push(level);
    }

   const depth = levels.length;
    console.log(`Глубина дерева:${depth}`);
    console.log(`Дерево:`, levels);
   return levels;
}
}




