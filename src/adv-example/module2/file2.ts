import s from './service';
import h1 from '../common/helper1';
import h2 from '../common/helper2';

const method = () => {
    return s.method() + '2' + h1.method() + h2.method();
};

export default { method };