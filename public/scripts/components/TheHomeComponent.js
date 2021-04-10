import TheLanding from './TheLandingComponent.js';
import TheSlider from './TheSliderComponent.js';
import TheHeader from './TheHeaderComponent.js';

export default {

    name: 'TheHomePage',

    created: function(){
    },

    template:`
        <section>
            <div class="landing">
                <theheader></theheader>
                <landing class="landing-hero"></landing>
            </div>

            <sliders>
            </sliders>
        </section>
    `,

    components:{
        theheader: TheHeader,
        landing: TheLanding,
        sliders: TheSlider,
    }

}
