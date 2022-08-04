import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import Nav from "./Nav/Index"
import Home from "./Home/Index"
import Videos from "./Activities/Videos/Index"
import Video from "./Activities/Videos/Video"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="video-activities" element={<Videos />} />
        <Route path="video-activity">
          <Route path=":title" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
