import {createStore} from 'vuex'

import state from './state'
// import actions from './actions'
import mutations from './mutations'


// const store = createStore({
//     state () {
//         return {
//             count: 1
//         }
//     }
// });
//
// export default store;

export default createStore({
    state,
    // actions,
    mutations
})