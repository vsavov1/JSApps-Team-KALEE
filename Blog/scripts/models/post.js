var Post = (function() {
    function Post(id, title, content, author, dateCreated, viewsCount, voteCount, comments ) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.dateCreated = dateCreated;
        this.viewsCount = viewsCount;
        this.voteCount = voteCount; 
        this.commentsCount = comments;

        //Махнах коментарите тъй като в таблицата в парсе ги няма // Веселин
        // if (!comments) {
        //     this.comments = [];
        //     this.commentsCount = 0; 
        // } else {
        //     this.comments = comments;
        //     this.commentsCount = comments.length; 
        // }
    }

    Post.prototype.addComment = function(comment) {
        this.comments.push(comment);
    };

    return Post;
}());