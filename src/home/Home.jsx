import { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useQuestionContext } from '../context/Context';
import {
  getFromSession,
  removeFromSession,
  saveToSession,
} from '../services/utils';
import Getdata from '../data/Getdata';

function Home() {
  const { question, setQuestion } = useQuestionContext();
  const navigate = useNavigate();

  useEffect(() => {
    const data = getFromSession('question');
    if (data) setQuestion([...data]);
    else
      Getdata()
        .then((res) => {
          setQuestion([...res]);
          saveToSession('question', [...res]);
        })
        .catch((err) => new Error(err));

    if (getFromSession('answerTracker')) removeFromSession('answerTracker');
  }, []);

  return (
    <div className="whole">
      <div className="homePage">
        <header className="title">
          <span>ApI sEaRcH </span> <span>QUIZ</span>
        </header>
        <div className="homepage__body">
          <header>Guide / Instructions</header>
          <ul>
            <li>
              The question listed are ment to be answered either true or false
              where for each correct answer, you score a point.
            </li>
            <li>
              The sum of your results will be displayed only at the end of the
              quize only after the quize is over
            </li>
            <li>Reason out your answer well and make the right choice</li>
            <li>
              Each time you move onto a next page, your previous final choice is
              considered and there is no way of going back to it
            </li>
            <li>
              <span className="good-luck">Best of Luck</span>
            </li>
          </ul>
        </div>
        {question ? (
          <button
            type="button"
            className="advance-btn"
            onClick={() => navigate('/question/0')}
          >
            Advance
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
