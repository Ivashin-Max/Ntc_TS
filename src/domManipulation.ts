export class Paint {


  appendCircle(parent: string, position: string, rowDept: number, value: string): HTMLDivElement{
    const circle = document.createElement("div");
    circle.className = `circle ${position} row-${rowDept} ${value}`;
    circle.innerText = value;
    document.getElementsByClassName(parent)[0]?.append(circle);
    return circle;
  }

  private changeLevelWidth ( width: number, element: HTMLElement, side: string): void{
  const sideClass = Object.entries(element.classList)[1];

    if (element.style && sideClass.includes("left")) {
      element.style.right = `${300 / width}px`;
    }

    if (element.style && sideClass.includes("right")) {
      element.style.left = `${300 / width}px`;
    }
  }

  adaptRow(elements: HTMLCollectionOf<Element>, width: number, side: string): void{
    for (const [, element] of Object.entries(elements)) {
      const el = <HTMLElement> element;
      this.changeLevelWidth(width, el, side);
    }
  }

  shine(value: string): void{
    const element = document.getElementsByClassName(`${value}`)[0];
    element.classList.toggle("shine");
    setTimeout(() => {
      element.classList.toggle("shine");
    }, 5000);
  }

  getRowElements(rowDept: number ): HTMLCollectionOf<Element>{
    return document.getElementsByClassName(`row-${rowDept}`);
  }
}
