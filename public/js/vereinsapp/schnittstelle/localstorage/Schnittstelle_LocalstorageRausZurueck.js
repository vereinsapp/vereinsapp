function Schnittstelle_LocalstorageRausZurueck(schluessel) {
    let LocalstorageRaus = localStorage.getItem("vereinsapp_" + schluessel);

    if (LocalstorageRaus === null) LocalstorageRaus = undefined;
    else LocalstorageRaus = Schnittstelle_VariableWertBereinigtZurueck(LocalstorageRaus);

    return LocalstorageRaus;
}
