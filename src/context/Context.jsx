import { useState, createContext, useReducer } from "react";
import run from "../config/gemini";

// const AppReducer = (state, action) => {
//     switch (action.id) {
//         case "INPUT_UPDATE": {
//             const input = action.payload;
//             return {
//                 ...state,
//                 input
//             }
//         }
//         // ... more cases
//     }
// }

// export const AppContext = createContext();

// const initialState = {
//     prevPrompts: [],
//     recentPrompt: "",
//     showResult: false,
//     loading: false,
//     resultData: "",
//     input: "",
// }

// const AppProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(AppReducer, initialState)
//     return (
//         <AppContext.Provider value={{
//             ...state,
//             dispatch,
//             // newChat
//         }}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export default AppProvider

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, next) => {
        setTimeout(function () {
            setResultData(prev => prev + next);
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async prompt => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response = "";
        if (prompt != undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setRecentPrompt(input);
            setPrevPrompts(prev => [...prev, input]);
            response = await run(input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += `<b>${responseArray[i]}</b>`
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false);
        setInput("");
    }
    const ContextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };


    // onSent("What is react?");

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;