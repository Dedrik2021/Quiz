import { createStore } from 'vuex';

import questionModule from './modules/questions/index.js';
import totalScoreModule from './modules/totalScore/index.js';

const store = createStore({
	modules: {
		questions: questionModule,
		totalScore: totalScoreModule
	}
});

export default store;
