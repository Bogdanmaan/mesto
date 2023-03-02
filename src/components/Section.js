export class Section {
    constructor ({renderer}, sectionElement) {
        this._renderer = renderer;
        this._container = sectionElement;
    }

    prependItem(item) {
        this._container.prepend(item);
    }

    renderItems (initialCards) {
        initialCards.forEach((item) => {
            this.renderer(item);
          })
    }

    renderer (item) {
        this._renderer(item);
    }

    addItem(element) {
        this._container.append(element);
      }
}