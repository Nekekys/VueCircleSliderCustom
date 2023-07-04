import CircleSlider from "./components/CircleSlider.vue";

export default {
    install: (app, options) => {
        app.component('VueCircleSlider', CircleSlider)
    }
}
