import { ref, reactive } from 'vue'
import CPKRESULT from '../assets/cpkResult.json'
import BUSTED from '../assets/busted.json'
import NOTLISTED from '../assets/notListed.json'
import WNIOSKI from '../assets/wnioski.json'
import TERYT from '../assets/teryt.json'

export const useCpk = () => {
  const user = reactive({
    name: '',
    age: '',
    score: 0,
  })

  const URL_GEOPORTAL = 'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel='
  const URL_GEOSYSTEM = 'https://polska.e-mapa.net/?identifyParcel='
  const getObreb = (shortObreb: number) => shortObreb ? shortObreb.toString().padStart(4, "0") : '';
  const getParcel = (item) => item.jednosta_numer_ew + '.' + getObreb(item.obreb_numer) + '.' + item.numer_dzialki;
  const getObrebName = (terc) => getWiesName(terc)  + ", " +powiaty.find(({ number }) => number === terc.substring(0, 4))?.name + ", gm. " + getGmina(terc);

  const getGmina = (terc) => gminy[terc.split('.')[0]]
  const getWiesId = (terc) => terc.split('.')[1]


  const getWiesName = function (terc) {
    const gmina = getGmina(terc);
    if (gmina === 'Wiskitki') {
      return Wiskitki[getWiesId(terc)];
    } else if (gmina === 'Teresin') {
      return Teresin[getWiesId(terc)];
    } else if (gmina === 'Baranów') {
      return Baranow[getWiesId(terc)];
    }
  }

  const gminy = { '143805_5': "Wiskitki", '143805_2': "Wiskitki", "142808_2": "Teresin", "140503_2": "Baranów" }

  const Wiskitki = {
    "0001": "ALEKSANDRÓW",
    "0002": "ANTONIEW",
    "0003": "BABSKIE BUDY",
    "0004": "CZERWONA NIWA WIEŚ",
    "0005": "CZERWONA NIWA PARCEL",
    "0006": "DUNINOPOL",
    "0007": "DZIAŁKI",
    "0008": "FELIKSÓW",
    "0009": "FRANCISZKÓW",
    "0010": "GUZÓW",
    "0011": "HIPOLITÓW",
    "0012": "JANÓWEK",
    "0013": "JESIONKA",
    "0014": "JÓZEFÓW",
    "0015": "KAMIONKA",
    "0016": "ŁUBNO",
    "0017": "MIEDNIEWICE",
    "0018": "CYGANKA",
    "0019": "NOWA WIEŚ",
    "0020": "NOWE KOZŁOWICE",
    "0021": "NOWY DRZEWICZ",
    "0022": "NOWY ORYSZEW",
    "0023": "ORYSZEW OSADA",
    "0024": "PODBUSZYCE",
    "0025": "PODORYSZEW",
    "0026": "POPIELARNIA",
    "0027": "PROŚCIENIEC",
    "0028": "RÓŻANÓW",
    "0029": "SMOLARNIA",
    "0030": "SOKULE",
    "0031": "STARA WIEŚ"
  }

  const Teresin = {
    "0018": "Pawłówek",
    "0011": "Maurycew",
    "0022": "Skrzelew",
  }
  const Baranow = {
    "0005": "Buszyce",
    "0018": "Stanisławów",
    "0021": "Wyczółki",
  }
  const powiaty = [
    { name: "żyrardowski", number: '1438' },
    { name: "grodziski", number: '1405' },
    { name: "sochaczewski", number: '1428' },
  ];

  const wishlist = ref([]);

  function sort() {
    return CPKRESULT.sort(function (a, b) {
      a = a.data_wydania_decyzji.split('-');
      b = b.data_wydania_decyzji.split('-');
      return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
    });
  }

  let targetBlank = ref(true)
  const target = () => targetBlank.valueOf() ? '_blank' : '_self';

  const wydanoDlaWniosku = (dzialka: string) => CPKRESULT.map(result => getParcel(result)).find(i => i === dzialka);
  const pozostaleDlaWniosku = (dzialka: string) => NOTLISTED.map(result => getParcel(result)).find(i => i === dzialka);

  return {
    user,
    wishlist,
    wydanoDlaWniosku,
    pozostaleDlaWniosku,
    URL_GEOPORTAL,
    URL_GEOSYSTEM,
    getObreb,
    getParcel,
    getObrebName,
    sort,
    target,
    DATA: CPKRESULT,
    BUSTED,
    NOTLISTED,
    WNIOSKI
  }
}