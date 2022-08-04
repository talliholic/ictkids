import { Link } from "react-router-dom"
import videoActivities from "../../json/video-activities.json"
import "./index.css"

const Videos = () => {
  const titles = [...new Set(videoActivities.map((item) => item.title))]
  return (
    <div className="container">
      {titles.map((title, i) => (
        <Link className="title-link" key={i} to={"/video-activity/" + title}>
          {title}
        </Link>
      ))}
    </div>
  )
}

export default Videos
