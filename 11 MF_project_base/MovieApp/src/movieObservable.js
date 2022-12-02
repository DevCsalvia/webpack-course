import {BehaviorSubject} from 'rxjs';

// Subject in compare to BehaviorSubject doesn't send initial value when subscribe action happens
const movieData = new BehaviorSubject(null);

export default movieData;