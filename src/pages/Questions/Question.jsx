/* eslint-disable react/no-danger */
import './question.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestionContext } from '../../context/Context';
import { getFromSession, saveToSession } from '../../services/utils';

function Question() {
  const { question, setQuestion, answerTracker, setAnswerTracker } =
    useQuestionContext();

  const navigate = useNavigate();
  const params = useParams();
  const pageIndex = +params.id; // this is same as saying pageIndex = parseInt(params.id). it is neccessary to convert to a number bcs the value in the object returned by params is a STRING

  const toNextQuestions = () => {
    navigate(pageIndex === 9 ? '/results' : `/question/${pageIndex + 1}`, {
      replace: true,
    });
  };

  const updateAnswerTracker = (ans, correctAns) => {
    const prevAns = getFromSession('answerTracker') || answerTracker;

    if (ans === correctAns) prevAns.passed += 1;
    else prevAns.failed += 1;

    saveToSession('answerTracker', prevAns);

    setAnswerTracker({ ...prevAns });
  };

  useEffect(() => {
    const data = getFromSession('question');
    if (data) setQuestion([...data]);
  }, []);

  return (
    <div className="question-whole">
      {question ? (
        <div className="questionPage">
          <p className="category">
            category: <span> {question[pageIndex].category}</span>
          </p>
          <header> Question {pageIndex + 1} out of 10</header>

          <p
            className="questionSepSep"
            dangerouslySetInnerHTML={{
              __html: question[pageIndex].question,
            }}
          />
          <div className="alternatives">
            <button
              className="true_btn"
              value="True"
              type="button"
              onClick={(e) => {
                updateAnswerTracker(
                  e.target.value,
                  question[pageIndex].correct_answer
                ); // this is the function passed as parameter to update the anserCount
                toNextQuestions();
              }}
            >
              True
            </button>

            <button
              className="false_btn"
              value="False"
              type="button"
              onClick={(e) => {
                updateAnswerTracker(
                  e.target.value,
                  question[pageIndex].correct_answer
                ); // this is the function passed as parameter to update the anserCount
                toNextQuestions();
              }}
            >
              False
            </button>
          </div>
        </div>
      ) : (
        <p className="loading_text">Loading . . .</p>
      )}
    </div>
  );
}

export default Question;
