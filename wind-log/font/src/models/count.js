export default {
    namespace: 'count',
    state: 0,
    effects: {
        *add_count({ payload }, { call, put }) {
            yield put({
                type: 'add'
            })
        }
    },
    reducers: {
        add(count) {
            return count + 1;
        },
        minus(count) {
            return count - 1;
        }
    }
}