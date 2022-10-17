class Edit {
    constructor(container) {
        this.container = container;
        this.editBody = container.querySelector('.edit-body');
        this.editFooter = container.querySelector('.edit-footer');
        this.editContent = container.querySelector('.edit-content');
        this.hide = this.hide.bind(this);
    }
    setEditBody(content) {
        this.editBody.innerHTML = '';
        this.editBody.append(content);
    }

   getEditBody() {
        return this.editBody;
    }

   getEditFooter() {
        return this.editFooter;
    }

    show() {
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
    }
}

export default Edit;