import { Leaf } from "./leaf";
import { Paint } from "./domManipulation";

const paint: Paint = new Paint;

export class Tree<T> {

  constructor(public start: Leaf<T> | null){
  this.start = null;
  }


   add(value: T): void {
   const newLeaf = new Leaf<T>(value, null, null);
   const stringValue = `${value}`;

   if (!this.start) {
     this.start = newLeaf;
     paint.appendCircle("treeArea", "top", 1, stringValue);
   } else {
     this.addLeaf(this.start, newLeaf, value);
   }
  }

  private addLeaf(leaf: Leaf<T>, newLeaf: Leaf<T>, value: T): void {
    const double = this.checkValue(value);
    if (double){
      alert("Нельзя вводить повторные значения");
    } else {


    const stringValue = `${value}`;

    if (newLeaf.value < leaf.value) {
        if (leaf.left === null) {
            leaf.left = newLeaf;

            const currentLevelCount = this.countLevels();
            const currentDepth = this.findLevel(currentLevelCount, newLeaf.value);

             if (currentDepth){
              const width = this.findWidth(currentLevelCount, +currentDepth);
              paint.appendCircle(`${leaf.value}`, "left", currentDepth, stringValue);

              if (width){
               const currentRowElements = paint.getRowElements(currentDepth);
               paint.adaptRow(currentRowElements, width, "left");
              }
             }

        } else {
            this.addLeaf(leaf.left, newLeaf, value);
        }
    } else {
        if (leaf.right === null) {
            leaf.right = newLeaf;

            const currentLevelCount = this.countLevels();
            const currentDepth = this.findLevel(currentLevelCount, newLeaf.value);

            if (currentDepth){
              const width = this.findWidth(currentLevelCount, +currentDepth);
              paint.appendCircle(`${leaf.value}`, "right", currentDepth, stringValue);

              if (width){
               const currentRowElements = paint.getRowElements(currentDepth);
               paint.adaptRow(currentRowElements, width, "right");
              }

            }

        } else {
            this.addLeaf(leaf.right, newLeaf, value);
        }
    }
  }
}

private findLevel(tree: T[][], value: T): number | null{
  for (const [i, element] of Object.entries(tree)){
    for (const el of element){
      console.log(i, typeof(i), el, typeof(el));
      if (el === value){
        console.log(i, typeof(i));
        return (Number(i)) + 1;
    }
  }
  }
  return null;
}



private findWidth(tree: T[][], level: number): number | null{
  for (const [i, element] of Object.entries(tree)){
    if ((Number(i)) + 1 === level){
     return element.length;
    }
  }
  return null;
}
 checkValue(value: unknown): boolean{
  const allLeafs = [...this.countLevels()];
  for (const leaf of allLeafs) {
    if (Number(value) === Number(leaf)){
      return true;
    }
  }
  return false;
}

private countLevels(): [][] | T[][] {
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


