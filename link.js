export default function link(route) {
    window.dispatchEvent( new CustomEvent('changeRoute', { detail: {route} }));  //  { route: 'login' } })); зеленого логина нет у Андрея  detail: {route}
}