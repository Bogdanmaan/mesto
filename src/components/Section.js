export class Section {
    constructor ({data, renderer}, sectionElement) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = sectionElement;
    }

    renderItems () {
        this._initialArray.forEach((item) => {
            this._renderer(item);
          })
    }

    addItem(element) {
        this._container.prepend(element);
      }
}