import s from '../module2/service';
import h from '../common/helper2';

const method = () => `${s.method()}${h.method()}`;

export default { method };
