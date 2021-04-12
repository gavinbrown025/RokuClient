export default {

    name: 'TheHeaderComponent',

    data() {
        return {
            showsettings: false,
            showsearch: false,
        }
    },

    template: `
        <header>
            <div class="logo">
                <img src="images/roku-logo.png" alt="Roku Logo">
            </div>

            <div class="header-home">
                <nav class="main-nav">
                    <ul>
                        <li>
                            <router-link to="/home">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/movies">All Movies</router-link>
                        </li>
                        <li>
                            <router-link to="/music">Music</router-link>
                        </li>
                        <li>
                            <router-link to="/kids">Kids</router-link>
                        </li>
                    </ul>
                </nav>

                <div class="header-meta">
                    <div class="search">
                        <input :class="{'show' : showsearch}" class="search-bar" type="text">
                        <img @click="showSearch" src="images/search.svg" alt="search icon">
                    </div>
                    <div class="user-avatar-icon">
                        <img @click="showSettings" src="images/temp_avatar.svg" alt="user avatar">
                    </div>
                </div>
            </div>

            <div @click="showSettings" class="kabab-menu">
                <div class="k-dot"></div>
                <div class="k-dot"></div>
                <div class="k-dot"></div>
            </div>

            <div :class="{'show' : showsettings}" class="user-dropdown">
                <div class="user-avatar-icon">
                    <img @click="showSettings" src="images/temp_avatar.svg" alt="user avatar">
                </div>
                <ul>
                    <li>
                        <router-link to="/users">Switch User</router-link>
                    </li>
                    <li>
                        <a @click.prevent="$emit('showedituser')">Edit Profile</a>
                    </li>
                    <li>
                        <router-link to="/home">Logout</router-link>
                    </li>
                </ul>
            </div>
        </header>
    `,
    methods: {
        showSettings(){
            this.showsettings = this.showsettings ? false : true;
        },
        showSearch(){
            this.showsearch = this.showsearch ? false : true;
        }
    }
}