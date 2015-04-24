var Post = (function() {
    function Post(id, title, content, author, dateCreated, comments) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.array = [];
        this.dateCreated = dateCreated;
        if (!comments) {
            this.comments = [];
        } else {
            this.comments = comments;
        }
    }

    Post.prototype.addComment = function(comment) {
        this.comments.push(comment);
    };

    return Post;
}());