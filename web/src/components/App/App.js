import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Quotes from '../Quotes/Quotes';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import Projects from '../Projects/Projects';
import Strategy from '../Strategy/Strategy';
import About from '../About/About';

import './App.scss';
import Dots from '../Dots/Dots';
import Banner from '../Banner/Banner';

const Components = () => {
  return (
    <React.Fragment>
      <Banner />

      <About />

      <Dots name="strategy" />
      <Strategy />
      <Posts />

      <Dots name="projects-before" />
      <Projects />
      <Dots name="projects-after" />

      <Quotes />
    </React.Fragment>
  );
};

export default function App() {
  return (
    <div className="app">
      <Header />

      <Router>
        <Switch>
          <Route exact path="/" component={Components} />
          <Route exact path="/articles" component={Posts} />
          <Route exact path="/articles/:id">
            <Post />
          </Route>
        </Switch>
      </Router>

      <Dots name="footer" />
      <Footer />
    </div>
  );
}
