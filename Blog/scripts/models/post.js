var Post = (function() {
    function Post(id, title, content, author, dateCreated, viewsCount, voteCount, commentsCount, comments, img) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        // var dateParts = dateCreated.split('-');
        // console.log(dateParts);
        // this.dateCreated = dateParts[0] + "/" +  dateParts[1] - 1 + "/" +;
        var date = new Date(dateCreated);
        this.dateCreated = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
        this.viewsCount = viewsCount;
        this.voteCount = voteCount; 
        this.commentsCount = commentsCount;
        this.img = img;

        //Махнах коментарите тъй като в таблицата в парсе ги няма // Веселин
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