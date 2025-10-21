function Schnittstelle_LocalstorageRausZurueck(schluessel, wert_undefined) {
    let localstorage_raus = localStorage.getItem("vereinsapp_" + schluessel);
    if (localstorage_raus === null) localstorage_raus = undefined;

    return Schnittstelle_VariableWertBereinigtZurueck(localstorage_raus, wert_undefined);
}
