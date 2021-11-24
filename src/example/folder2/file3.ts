import f2 from './file2';
import f1 from '../folder1/file1';

const method3 = () => {
    const res1 = f1.method1();
    const res2 = f2.method2();
    return res1 + res2;
};

export default { method3 };
