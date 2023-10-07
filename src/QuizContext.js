const {useMemo, useReducer, createContext, useContext, useEffect} = require("react");

const QuizContext = createContext()

function QuizProvider({children}){
    
    const initialState = useMemo(() => {
        return {
            questions: [],
            questionNumber: 0,
            isLoading: false,
            showStartScreen: true,
            showExitScreen: false,
            selectedAnswer: null,
            options: [],
            doubleAttempt: 0,
            showCorrectAnswer: false,
            earned: "₹ 0"
        };
    }, []);

    function reducer(state, action){
        switch(action.type){
            case "setQuestions":
                return{
                    ...state,
                    questions: action.payload
                };
            case "setQuestionNumber":
                return{
                    ...state,
                    questionNumber: action.payload
                };
            case "incrementQuestion":
                return{
                    ...state,
                    questionNumber: state.questionNumber + 1
                };
            case "setIsLoading":
                return{
                    ...state,
                    isLoading: action.payload
                };
            case "setShowStartScreen":
                return{
                    ...state,
                    showStartScreen: action.payload
                };
            case "setShowExitScreen":
                return{
                    ...state,
                    showExitScreen: action.payload
                };
            case "setSelectedAnswer":
                return{
                    ...state,
                    selectedAnswer: action.payload
                };
            case "setOptions":
                return{
                    ...state,
                    options: action.payload
                };
            case "setDoubleAttempt":
                return{
                    ...state,
                    doubleAttempt: state.doubleAttempt > 0 ? state.doubleAttempt - 1 : state.doubleAttempt + 1
                };
            case "setShowCorrectAnswer":
                return{
                    ...state,
                    showCorrectAnswer: action.payload
                };
            case "setEarned":
                return{
                    ...state,
                    earned: action.payload
                }
            default:
                throw new Error('Unkown Action');
        }
    }

    const moneyPyramid = useMemo(
        () =>
          [
            { id: 0, amount: "₹ 100" },
            { id: 1, amount: "₹ 200" },
            { id: 2, amount: "₹ 300" },
            { id: 3, amount: "₹ 500" },
            { id: 4, amount: "₹ 1.000" },
            { id: 5, amount: "₹ 2.000" },
            { id: 6, amount: "₹ 4.000" },
            { id: 7, amount: "₹ 8.000" },
            { id: 8, amount: "₹ 16.000" },
            { id: 9, amount: "₹ 32.000" },
            { id: 10, amount: "₹ 64.000" },
            { id: 11, amount: "₹ 125.000" },
            { id: 12, amount: "₹ 250.000" },
            { id: 13, amount: "₹ 500.000" },
            { id: 14, amount: "₹ 1.000.000" },
          ].reverse(),
        []
      );

    const [{questions, status, questionNumber, isLoading, showStartScreen, showExitScreen, selectedAnswer, options, doubleAttempt, showCorrectAnswer, earned}, dispatch] = useReducer(reducer, initialState);

    function openStartScreen(){
        dispatch({type: "setEarned", payload: "₹ 0"});
        dispatch({type: "setShowStartScreen", payload: true});
        dispatch({type: "setShowExitScreen", payload: false});
    }
    function openExitScreen(){
        dispatch({type: "setQuestionNumber", payload: 0});
        dispatch({type: "setShowExitScreen", payload: true});
    }
    
    function closeStartScreen(){
      dispatch({type: "setShowStartScreen", payload: false});
      fetchQuestions();
    }

    async function fetchQuestions(){
        dispatch({type: "setIsLoading", payload: true});
        const res = await fetch(`https://opentdb.com/api.php?amount=16&type=multiple`);
        const data = await res.json();
        dispatch({type: "setQuestions", payload: data.results});
        dispatch({type: "setIsLoading", payload: false});
        console.log(data.results);
    }

    useEffect(() => {
        questionNumber > 0 && dispatch({type: "setEarned", payload: moneyPyramid.find((m) => m.id === questionNumber - 1).amount});
    }, [questionNumber, moneyPyramid, dispatch]);
    useEffect(() => {
        questionNumber > 14 && openExitScreen();
    }, [questionNumber]);


    return (
        <QuizContext.Provider value={{questions, status, questionNumber, isLoading, showStartScreen, showExitScreen, selectedAnswer, options, doubleAttempt, showCorrectAnswer, moneyPyramid, earned, dispatch, openStartScreen, openExitScreen, closeStartScreen}}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz(){
    const context = useContext(QuizContext);
    if(context === undefined){
        throw new Error("QuizContext was used outside of QuizProvider");
    }
    return context;
}

export {QuizProvider, useQuiz}