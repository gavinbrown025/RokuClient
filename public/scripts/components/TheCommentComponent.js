export default {
    name: 'TheCommentComponent',

    data() {
        return {
            movie: {},
            currentUser: {},
            retrievedComments: [],
            newComment: {
                name: "",
                comment: ""
            },
            commentmessage: ""
        }
    },

    mounted() {
        this.currentUser = JSON.parse(localStorage.getItem('cacheduser'));
        this.movie = JSON.parse(localStorage.getItem('selectedMovie'))

        this.newComment.name = this.currentUser.user_fname;
        this.getComments(this.movie.movies_id);
    },

    template:`
        <section class="comments-con">
            <form id="comments-form" @submit.prevent="postComment">
                <textarea v-model="newComment.comment" name="comment" placeholder="Leave a Comment"></textarea>
                <button type="submit" class="button" @submit.prevent="postComment">Comment</button>
            </form>
            <div class="all-comments-con">
                <div v-if="retrievedComments.length" v-for="comment in retrievedComments" class="comment">
                    <h3>{{comment.user_name}} <span>- {{comment.time}}</span></h3>
                    <p>{{comment.comment}}</p>
                </div>
                <div v-else class="comment">
                    <h3>Be the first to comment</h3>
                </div>
            </div>
        </section>
    `,

    methods: {
        getComments(id) {
            fetch(`api/getcomments/${id}`)
            .then(res => res.json())
            .then(data => {
                this.retrievedComments = data;
            })
        },
        postComment() {
            if (this.newComment.comment !=""){

                let commentData = JSON.stringify({
                    name: this.newComment.name,
                    comment: this.newComment.comment,
                    movie: this.movie.movies_id
                });

                fetch('/api/comment', {
                    method: 'POST',
                    body: commentData,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        this.getComments(this.movie.movies_id)
                    }
                })
                .catch(err => console.log(err));
            }

        }
    }
}