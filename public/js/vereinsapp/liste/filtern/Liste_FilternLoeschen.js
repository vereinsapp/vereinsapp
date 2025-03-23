function Liste_FilternLoeschen(dom, ziel_id, instanz, liste) {
    const $eigenschaft = dom.$filtern_eigenschaft;
    const eigenschaft = $eigenschaft.attr("data-eigenschaft");

    let filtern;
    if (typeof instanz !== "undefined") filtern = LISTEN[liste].instanz[instanz].filtern; // Liste filtern
    else if (typeof ziel_id !== "undefined") {
        // Personenkreis beschränken
        filtern = $("#" + ziel_id).val();
        if (typeof filtern !== "undefined" && isJson(filtern)) filtern = JSON.parse(filtern);
        else filtern = new Object();
    }

    delete filtern[eigenschaft];

    if (typeof instanz !== "undefined") LISTEN[liste].instanz[instanz].filtern = filtern; // Liste filtern
    else if (typeof ziel_id !== "undefined") $("#" + ziel_id).val(JsonStringifiedZurueck(filtern)); // Personenkreis beschränken

    let filtern_prio_niedrig;
    if (typeof instanz !== "undefined") {
        // Liste filtern
        filtern_prio_niedrig = $("#" + instanz + ".liste").attr("data-filtern");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();
    } else if (typeof ziel_id !== "undefined") {
        // Personenkreis beschränken
        const $ziel = $("#" + ziel_id);

        /* speziell für filtern_mitglieder bei termine */
        const kategorie = $ziel.closest('.formular[data-liste="termine"]').find('.eingabe[data-eingabe="kategorie"]').val();
        if (typeof kategorie !== "undefined" && kategorie in TERMINE_KATEGORIE_FILTERN_MITGLIEDER)
            filtern_prio_niedrig = TERMINE_KATEGORIE_FILTERN_MITGLIEDER[kategorie];
        else filtern_prio_niedrig = new Object();
    }

    Liste_FilternFormularEigenschaftAktualisieren($eigenschaft, filtern_prio_niedrig, liste);

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
