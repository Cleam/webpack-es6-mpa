import SL, { Arr, Browser } from '@/common/js/SL-es';

const testTS = () => {
  console.log(SL);
  console.log(Arr);
  console.log(Browser);
  // console.log(Str);
};

export default msg => {
  console.log(msg);
  testTS();
};
