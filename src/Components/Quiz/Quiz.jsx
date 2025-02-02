import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optionArray = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(++score);
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                optionArray[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const nextBtn = () => {
        if (index === data.length - 1) {
            setResult(true);
            return 0;
        }

        if (lock === true) {
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);

            optionArray.map((option) => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
            })
        }
    }

    const resetBtn = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    }


    return (
        <div className='container'>
            <h1>Quiz App</h1>

            {result ? <>
                <p>Your score is {score} out of {data.length}</p>
                <button onClick={resetBtn}>Reset</button>
            </> : <>
                <h2>{index + 1}. {question.question}</h2>
                <ul>
                    <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                </ul>

                <button onClick={nextBtn}>Next</button>
                <div className="question-index">
                    <p>{index + 1} of 5 questions</p>
                </div>
            </>}

        </div>
    )
}

export default Quiz