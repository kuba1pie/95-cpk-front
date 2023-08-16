import { ref, reactive } from 'vue'
import DATA from '../assets/cpkResult.json'
import BUSTED from '../assets/busted.json'
import NOTLISTED from '../assets/notListed.json'
import WNIOSKI from '../assets/wnioski.json'

export const useCpk = () => {
 const user = reactive({
   name: '',
   age: '',
   score: 0,
 })
 
const URL_GEOPORTAL= 'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel='
const URL_GEOSYSTEM = 'https://polska.e-mapa.net/?identifyParcel='
const getObreb = (numer) => numer.toString().padStart(4, "0");
const getParcel = (item) => item.jednosta_numer_ew + '.' + getObreb(item.obreb_numer) + '.' + item.numer_dzialki;
const getObrebName = (item) => powiaty.find(({ number }) => number === item.substring(0, 4)).name;

 const wishlist = ref([]);

 function sort() {
  return DATA.sort(function (a, b) {
    a = a.data_wydania_decyzji.split('-');
    b = b.data_wydania_decyzji.split('-');
    return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
  });
}
const powiaty = [
  { name: "żyrardowski", number: '1438' },
  { name: "grodziski", number: '1405' },
  { name: "sochaczewski", number: '1428' },
];

let targetBlank = ref(true)
const target = () => targetBlank.valueOf ? '_blank' : '_self'


 async function getData() {
   const url = `https://anyapi.com/api/user`;
   try {
     const response = await fetch(url);
     const data = await response.json();
     Object.assign(user, data.user)
     wishlist.value = data.wishlist;
     internalHelper();
   } catch (e) {}
 }
 
 // all of the things that you want to do in created hook should be called inside function body
 getData()
 
 return {
   user,
   wishlist,
   getData,
   URL_GEOPORTAL,
   URL_GEOSYSTEM,
   getObreb,
   getParcel,
   getObrebName,
   sort,
   target,
   DATA,
   BUSTED,
   NOTLISTED,
   WNIOSKI
 }
}