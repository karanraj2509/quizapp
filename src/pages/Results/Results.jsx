/* eslint-disable react/no-danger */
import './results.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionContext } from '../../context/Context';
import { getFromSession, removeFromSession } from '../../services/utils';

function Results() {
  const { answerTracker, setAnswerTracker, question, setQuestion } =
    useQuestionContext();
  const naviGate = useNavigate();

  const displayResults = () => {
    if (answerTracker.passed < 5) {
      if (answerTracker.passed < 1) {
        return 'Nothing personal 😹';
      }
      return 'Better luck next time 😟';
    }
    if (answerTracker.passed > 7) {
      return 'You are an Excellent someone 👏😌';
    }
    return 'good good 😉';
  };

  const clearData = (arg) => {
    if (arg) removeFromSession('question');
    removeFromSession('answerTracker');
    setAnswerTracker({ passed: 0, failed: 0 });
  };

  const reStartQuize = () => {
    clearData();
    naviGate('/question/0');
  };

  const endQuize = () => {
    clearData('all');
    naviGate('/');
  };

  useEffect(() => {
    const ansData = getFromSession('answerTracker');
    const data = getFromSession('question');

    if (data) setQuestion([...data]);
    if (ansData) setAnswerTracker(ansData);
  }, []);

  return (
    <div className="results-whole">
      <div className="results-page">
        <header>finalResults</header>
        <div className="score">
          <div className="rights">
            <p>Correct</p>
            <span>{answerTracker?.passed}</span>
          </div>
          <div className="wrongs">
            <p>Wrong</p>
            <span>{answerTracker?.failed}</span>
          </div>
        </div>

        <p className="my-review">{displayResults()}</p>

        <p className="correction-header">
          Below are the questions and right answers:
        </p>

        <ol className="questions-ans">
          {question?.map((ques) => {
            return (
              <li key={ques.question}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: ques.question,
                  }}
                />
                <span className="correct-ans">{ques.correct_answer}</span>
              </li>
            );
          })}
        </ol>

        <p className="would-you-like">would You like to restart the quize?</p>

        <div className="option">
          <button type="button" className="retake" onClick={reStartQuize}>
            Restart
          </button>
          <button type="button" className="retake" onClick={endQuize}>
            endQuize
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
