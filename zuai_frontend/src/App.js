import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

import HomePage from "./components/HomePage";
import Header from "./components/Header"
import PostDetails from "./components/PostDetails";
import PostingForm from "./components/PostingForm";
import SideContent from "./components/SideContent";
import Footer from "./components/Footer";

import './App.css';

const App = ()=> (
  <BrowserRouter>
  <Header />
  <div className="design-main">
  <SideContent/>
  <div className="main-content-background">
   
    <Routes>
    
    <Route path="/posts" element = {<HomePage/>} />
    <Route path = "/posts/:postId" element= {<PostDetails/>} />
    <Route path = "/create" element= {<PostingForm/>} />
    <Route path = "/edit/:postId" element={<PostingForm/>} />
     
    </Routes>
    </div>
    </div>
    <Footer />
  </BrowserRouter>
)

export default App;
