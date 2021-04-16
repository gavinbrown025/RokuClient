export default {
    name: 'TheAvatarComponent',

    data() {
        return {
            avatarList:[],
        }
    },

    created() {
        fetch(`/ums/avatar`)
        .then(res => res.json())
        .then(data => this.avatarList = data);
    },

    template:`
        <div class="avatar-list-con">
            <h2>Select Avatar</h2>
            <div class="avatars">
                <img
                v-for="image in avatarList"
                @click="$emit('selectavatar', image.avatar)"
                :src="'images/'+image.avatar"
                alt="avatar option"/>
            </div>
            <a class="button" @click.prevent="$emit('seeavatars')">Cancel</a>
        </div>
    `
}