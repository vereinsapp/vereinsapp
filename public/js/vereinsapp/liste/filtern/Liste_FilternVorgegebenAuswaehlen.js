function Liste_FilternVorgegebenAuswaehlen($vorgegebene_filter_auswahl, ziel_id, vorgegebene_filter_id, liste) {
    const filtern = Schnittstelle_VariableWertBereinigtZurueck(VORGEGEBENE_FILTER[liste][vorgegebene_filter_id].filtern);

    if (typeof $vorgegebene_filter_auswahl !== "undefined") $vorgegebene_filter_auswahl.val("");

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern))
            .trigger("change");

    Schnittstelle_DomModalSchliessen($vorgegebene_filter_auswahl.closest(".modal"));
}
