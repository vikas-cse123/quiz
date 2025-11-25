router.post("/create", checkAuth, createQuiz);
router.post("/check-ans/:questionNumber", checkAuth, checkAnswer);
router.get("/result/:quizId", checkAuth, quizResult);
router.post("/question/:questionNumber", checkAuth, getQuestion);
router.get("/history", checkAuth, getQuizHistory);
router.delete("/:quizId", deleteQuiz);
