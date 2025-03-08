/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

const Myquestions = createContext();

export function QuestionProvider({ children }) {
  const [question, setQuestion] = useState(null);

  const [answerTracker, setAnswerTracker] = useState({ passed: 0, failed: 0 });

  return (
    <Myquestions.Provider
      value={{
        question,
        setQuestion,

        answerTracker,
        setAnswerTracker,
      }}
    >
      {children}
    </Myquestions.Provider>
  );
}

export const useQuestionContext = () => useContext(Myquestions);
