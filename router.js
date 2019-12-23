import routerConfig from "./routerConfig.js";

export default class Router {
    constructor(anchor) {
        this.anchor = anchor;

        window.addEventListener('popstate', event => {
            this.changeRoute(event.state.route)
        })
      //  store.subscribe('store.....продолжить           ', this.changeRoute.bind(this))  // у роутера подписка на стор!!!
    }
    changeRoute(route) {
    const conf = routerConfig[route];
        console.log('changeRoute');
    if (!conf) return;
    if (this.component) {
        this.component.onDestroy();
    }

    window.history.pushState(conf.data,'', conf.url);
    this.component = new conf.component(this.anchor, conf.settings);
    this.component.render()
}
}