import { createRouter, createWebHistory } from 'vue-router';

import QuizPage from './pages/QuizPage.vue';
import CreateNewQuestion from './pages/CreateNewQuestion.vue';
import QuestionsList from './pages/QuestionsList';
import EditQuestion from './pages/EditQuestion';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: QuizPage },
		{ path: '/newQuestion', component: CreateNewQuestion },
		{ path: '/questions', component: QuestionsList, props: true },
		{path: '/questions/:id', component: EditQuestion, props: true},
	],
});

export default router;
