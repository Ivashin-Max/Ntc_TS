import { Tree } from "./binTree";
import { Paint } from "./domManipulation";


function initApp(): void {

  const tree: Tree<number> = new Tree(null);
  const paint: Paint = new Paint;

  const input = (document.getElementById("input") as HTMLInputElement);
  const add = document.getElementById("add");
  const find = document.getElementById("find");
  const deleteButton = document.getElementById("delete");

  add?.addEventListener("click", addLeaf);
  find?.addEventListener("click", shine);
  deleteButton?.addEventListener("click", deleteEl);

  function addLeaf(): void  {
    const leafValue = +(input.value);
    tree.add(leafValue);
    const fullTree = tree.countLevels();
    paint.clearElement("treeArea");
    paint.paintTree(fullTree);
    input.value = "";
  }

  function deleteEl(): void  {
    const leafValue = +(input.value);
    tree.removeValue(leafValue);
    const fullTree = tree.countLevels();
    paint.clearElement("treeArea");
    paint.paintTree(fullTree);
    input.value = "";
  }

  function shine(): void  {
    const leaf = tree.checkValue(input.value);
    if ( !leaf ){
      alert("Такого элемента нет в дереве");
      input.value = "";
      return;
    }
    paint.shine(input.value);
    input.value = "";
  }


}

initApp();

