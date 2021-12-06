export class Paint {


  shine(value: string): void{
    const element = document.getElementsByClassName(`value-${value}`)[0];
    element.classList.toggle("shine");
    setTimeout(() => {
      element.classList.toggle("shine");
    }, 5000);
  }



  paintTree(tree: [][] | number[][]): void{
    for (const [i, array] of Object.entries(tree)){
      console.log(i, typeof(i));
      console.log(`Уровень-${i}, внутри -`, array);
      this.createRow(+i);
      this.fillRow(+i, array);
    }
  }

  clearElement(element: string): void{
   document.getElementsByClassName(element)[0].innerHTML = "";
  }

  private createRow(level: number): void{
    const row = document.createElement("div");
    row.className = `row row-${level + 1}`;
    document.getElementsByClassName("treeArea")[0]?.append(row);
  }
  private fillRow(level: number, values: number[]): void{
    const parent = document.getElementsByClassName(`row-${level + 1}`)[0];
    // const maxElementsInRow = Math.pow(2, level);

    for (const value of values){
      const circle = this.createCircle(`${value}`);
      parent.append(circle);
    }
  }

  private createCircle(value: string): HTMLDivElement{
    const circle = document.createElement("div");
    circle.className = `circle value-${value}`;
    circle.innerText = value;
    return circle;
  }

}
