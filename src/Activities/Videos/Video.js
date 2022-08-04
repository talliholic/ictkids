import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import json from "../../json/video-activities.json"
import "./video.css"

const Video = () => {
  const { title } = useParams()
  const [data] = useState(json.filter((video) => video.title === title))
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [score, setScore] = useState(0)
  const total = Math.round((score / data[0].questions.length) * 100)

  const turnPage = () => {
    setPage((prev) => prev + 1)
  }
  const unTurnPage = () => {
    setPage((prev) => prev - 1)
  }

  useEffect(() => {
    if (data.length > 0) {
      setLoaded(true)
    }
  }, [data])
  return (
    <div className="video-quiz">
      {loaded && <h1>{title}</h1>}
      {loaded &&
        data[0].questions.map((q, i) => (
          <Embed
            page={page}
            key={i}
            i={i}
            data={data[0]}
            question={q.question}
            options={q.options}
            type={q.type}
            correct={q.correct}
            checks={q.checks}
            start={q.start}
            end={q.end}
            totalScore={setScore}
            scored={score}
            total={total}
          />
        ))}
      {loaded && (
        <div className="nav">
          <button disabled={page === 1} onClick={unTurnPage}>
            Back
          </button>
          <button
            disabled={page === data[0].questions.length}
            onClick={turnPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const Embed = ({
  i,
  page,
  data,
  start,
  end,
  question,
  type,
  options,
  checks,
  correct,
  totalScore,
  scored,
  total,
}) => {
  const [sent, setSent] = useState(false)
  const [score, setScore] = useState(0)
  const range = {
    startMin: Math.floor(start / 60),
    startSec: start % 60,
    endMin: Math.floor(end / 60),
    endSec: end % 60,
  }

  const check = (e) => {
    e.preventDefault()
    setSent(true)
    const type = e.target.type.value

    if (type === "options") {
      const answer = e.target.answer.value
      const index = options.indexOf(answer)

      if (index + 1 === correct) {
        setScore(1)
        totalScore((prev) => prev + 1)
      } else {
        setScore(0)
      }
    } else if (type === "checks") {
      const dbAnswers = []

      checks.forEach((check, i) => (dbAnswers[i] = options[check - 1]))

      const answers = []
      const getAnswers = (checked, value) => {
        if (checked) {
          answers.push(value)
        }
      }
      getAnswers(e.target.answer0.checked, e.target.answer0.value)
      getAnswers(e.target.answer1.checked, e.target.answer1.value)
      getAnswers(e.target.answer2.checked, e.target.answer2.value)
      getAnswers(e.target.answer3.checked, e.target.answer3.value)

      if (dbAnswers.join(" ") === answers.join(" ")) {
        setScore(1)
        totalScore((prev) => prev + 1)
      } else {
        setScore(0)
      }
    }
  }

  return (
    <div className={i !== page - 1 ? "none" : "embed"}>
      <iframe
        width="560"
        height="315"
        src={
          "https://www.youtube.com/embed/" +
          data.youtube +
          "?start=" +
          start +
          "&cc_load_policy=1&end=" +
          end
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="item">
        <div className="info">
          <p>
            Find the answer at{" "}
            {range.startSec < 10
              ? range.startMin + ":0" + range.startSec
              : range.startMin + ":" + range.startSec}{" "}
            to{" "}
            {range.endSec < 10
              ? range.endMin + ":0" + range.endSec
              : range.endMin + ":" + range.endSec}
            .
          </p>
          <p>
            <b>
              {scored} out of {data.questions.length}
            </b>{" "}
            correct question. I have scored
            <b>{" " + total + " "}</b> points.
          </p>
        </div>
        <h2>{"(" + (parseInt(i) + 1) + ") " + question}</h2>
        <div className="options">
          <form onSubmit={check} className="question">
            {type === "options" && (
              <div>
                <u>
                  <i>Select one option.</i>
                </u>
                <input type="hidden" name="type" value="options" />
              </div>
            )}
            {type === "options" &&
              options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    disabled={sent}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            {type === "checks" && (
              <div>
                <u>
                  <i>Select multiple options.</i>
                </u>
                <input type="hidden" name="type" value="checks" />
              </div>
            )}
            {type === "checks" &&
              options.map((option, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    name={"answer" + i}
                    value={option}
                    disabled={sent}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            <input type="submit" value="Check" disabled={sent} />
          </form>
          <div className="feedback">
            {sent && (
              <img
                src={
                  score === 1
                    ? "/feedback-media/check.jpg"
                    : "/feedback-media/cross.png"
                }
                alt="feedback"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
