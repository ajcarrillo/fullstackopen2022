import {CoursePart} from '../types';
import Total from './Total';
import Part from './Part';

interface CourseParts {
  courseParts: Array<CoursePart>;
}

const Content = ({courseParts}: CourseParts) => {
  return (
    <div>
      {courseParts.map((part) => {
        return <Part
          key={part.name}
          part={part}
        />;
      })}
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default Content;
