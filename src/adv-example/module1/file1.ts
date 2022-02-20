import s from '../module2/service';
import h from '../common/helper2';

const method = () => {
    return s.method() + '1' + h.method();
};

export default { method };