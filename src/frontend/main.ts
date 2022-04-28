import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faLeaf);

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component("fa", FontAwesomeIcon);
app.use(store).use(router).mount("#app");
