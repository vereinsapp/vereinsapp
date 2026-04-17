/**
 */

const SERVERDATA_HOLEN_EVENTS = new Array();

function Serverdata_Init() {
    if (ICH_ID !== null) {
        Serverdata_ServerdataHolen();
        setInterval(Serverdata_ServerdataHolen, SERVERDATA_HOLEN_ZYKLUSZEIT * 1000);
    }
}
