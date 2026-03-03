function Localstorage_RausZurueck(schluessel, wert_undefined) {
    let localstorage_raus = localStorage.getItem("vereinsapp_" + schluessel);
    if (localstorage_raus === null) localstorage_raus = undefined;

    return Liste_WertBereinigtZurueck(localstorage_raus, wert_undefined);
}
