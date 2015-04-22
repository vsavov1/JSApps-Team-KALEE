var Comment = (function () {
    function Comment(id, content, author, dateCreated) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.dateCreated = dateCreated;
    }

    return Comment;
}());