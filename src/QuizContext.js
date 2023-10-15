const {useMemo, useReducer, createContext, useContext, useEffect} = require("react");

const QuizContext = createContext()

function QuizProvider({children}){
    
    const initialState = useMemo(() => {
        return {
            userName: "",
            questions: [],
            questionNumber: 0,
            isLoading: false,
            showStartScreen: true,
            showExitScreen: false,
            selectedAnswer: null,
            options: [],
            doubleAttempt: 0,
            showCorrectAnswer: false,
            earned: "₹ 0",
            showQuitScreen: false,
            error: "",
            timeOver: false,
            freezeTime: false
        };
    }, []);

    function reducer(state, action){
        switch(action.type){
            case "setUserName":
                return{
                    ...state,
                    userName: action.payload
                }
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
                };
            case "setShowQuitScreen":
                return{
                    ...state,
                    showQuitScreen: action.payload
                };
            case "setError":
                return{
                    ...state,
                    error: action.payload
                };
            case "setTimeOver":
                return{
                    ...state,
                    timeOver: action.payload
                };
            case "setFreezeTime":
                return{
                    ...state,
                    freezeTime: action.payload
                }
            default:
                throw new Error('Unkown Action');
        }
    }

    const moneyPyramid = useMemo(
        () =>
          [
            { id: 0, amount: "₹ 5,000" },
            { id: 1, amount: "₹ 10,000" },
            { id: 2, amount: "₹ 20,000" },
            { id: 3, amount: "₹ 40,000" },
            { id: 4, amount: "₹ 80,000" },
            { id: 5, amount: "₹ 1,60,000" },
            { id: 6, amount: "₹ 3,20,000" },
            { id: 7, amount: "₹ 6,40,000" },
            { id: 8, amount: "₹ 12,50,000" },
            { id: 9, amount: "₹ 25,00,000" },
            { id: 10, amount: "₹ 50,00,000" },
            { id: 11, amount: "₹ 1,00,00,000" },
            { id: 12, amount: "₹ 5,00,00,000" },
            { id: 13, amount: "₹ 7,00,00,000" },
            { id: 14, amount: "₹ 10,00,00,000" },
          ].reverse(),
        []
      );

    const [{userName, questions, status, questionNumber, isLoading, showStartScreen, showExitScreen, selectedAnswer, options, doubleAttempt, showCorrectAnswer, earned, showQuitScreen, error, timeOver, freezeTime}, dispatch] = useReducer(reducer, initialState);

    function openStartScreen(){
        dispatch({type: "setEarned", payload: "₹ 0"});
        dispatch({type: "setShowStartScreen", payload: true});
        dispatch({type: "setShowExitScreen", payload: false});
    }
    function openExitScreen(){
        dispatch({type: "setQuestionNumber", payload: 0});
        dispatch({type: "setShowExitScreen", payload: true});
        dispatch({type: "setShowQuitScreen", payload: false});
    }
    
    function closeStartScreen(){
      dispatch({type: "setShowStartScreen", payload: false});
      fetchQuestions();
    }

    function handleWrongAnswer(){
        openExitScreen();
        if(questionNumber > 9){
            dispatch({type: "setEarned", payload: "₹ 25,00,000"});
        }
        else if(questionNumber > 4){
            dispatch({type: "setEarned", payload: "₹ 80,000"});
        }
        else{
            dispatch({type: "setEarned", payload: "₹ 0"});
        }
        dispatch({type: "setTimeOver", payload: false});
    }

    async function fetchQuestions(){
        try{
            dispatch({type: "setIsLoading", payload: true});
            dispatch({type: "setError", payload: ""});
            const res = await fetch(`https://opentdb.com/api.php?amount=16&type=multiple`);
            if(!res.ok) throw new Error("Something went wrong while fetching Questions");
            const data = await res.json();
            if (data.response_code !== 0) throw new Error("Something went wrong while fetching Questions");
            dispatch({type: "setQuestions", payload: data.results});
            dispatch({type: "setError", payload: ""});
            console.log(data.results);
        }
        catch(err){
            console.log(err);
            if(err.name !== "AbortError"){
                dispatch({type: "setError", payload: err.message});
            }
        }
        finally{
            dispatch({type: "setIsLoading", payload: false});
        }
    }

    useEffect(() => {
        questionNumber > 0 && dispatch({type: "setEarned", payload: moneyPyramid.find((m) => m.id === questionNumber - 1).amount});
    }, [questionNumber, moneyPyramid]);
    useEffect(() => {
        questionNumber > 14 && openExitScreen();
    }, [questionNumber]);


    return (
        <QuizContext.Provider value={{userName, questions, status, questionNumber, isLoading, showStartScreen, showExitScreen, selectedAnswer, options, doubleAttempt, showCorrectAnswer, moneyPyramid, earned, showQuitScreen, error, timeOver, freezeTime, dispatch, openStartScreen, openExitScreen, closeStartScreen, handleWrongAnswer}}>
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