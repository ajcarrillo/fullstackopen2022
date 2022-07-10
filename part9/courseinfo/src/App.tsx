import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import {CoursePart, courseParts} from './types';

const App = () => {
  const courseName = "Half Stack application development";
  const courses: Array<CoursePart> = courseParts

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courses}/>
    </div>
  );
};

export default App;

