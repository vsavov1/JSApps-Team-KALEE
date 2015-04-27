var Post = (function() {
    function Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, comments, img, tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        var date = new Date(dateCreated);
        this.dateCreated = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
        this.viewsCount = viewsCount || 0;
        this.voteCount = voteCount  || 0; 
        this.commentsCount = commentsCount  || 0;
        this.img = img;
        this.tags = tags;
        
        if (!comments) {
            this.comments = [];
            this.commentsCount = 0; 
        } else {
            this.comments = comments;
            this.commentsCount = comments.length; 
        }
    }

    Post.prototype.addComment = function(comment) {
        this.comments.push(comment);
    };

    return Post;
}());