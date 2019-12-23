export default function createReducers() {
    return {
        addItem: (payload, state) => ({
            ...state,
            todo: [payload, ...state.todo],
        }),
        changeItem: (payload, state) => {
            state.todo.splice(payload.id, 1, payload.value);

            return {
            ...state,
            todo: [...state.todo]
        };},
        changeListFilter: (payload, state) => ({
            ...state,
            filter: payload
        }),
        removeItem: (payload, state) => ({
            ...state,
            todo: [
                ...state.todo.slice(0, payload.id),
                ...state.todo.slice(payload.id + 1, state.todo.length),
            ]
        }),
        login: (payload, state) => ({
            ...state,
            userInfo: {
                authorized: true,
                ...payload,
            }
        }),
        logout:(payload, state) => ({
            ...state,
            userInfo: {}
        }),
    }
}