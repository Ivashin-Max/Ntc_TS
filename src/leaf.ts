export class Leaf<T> {

 constructor(public value: T, public left: Leaf<T> | null, public right: Leaf<T> | null){
  this.value = value;
  this.left = null;
  this.right = null;
 }

  getValue(): T {
  return this.value;
 }
}
