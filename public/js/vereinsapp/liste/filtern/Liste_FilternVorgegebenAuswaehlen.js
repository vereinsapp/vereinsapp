function Liste_FilternVorgegebenAuswaehlen($vorgegebene_filter_auswahl, ziel_id, vorgegebene_filter_id, liste) {
    const filtern_vorgegeben = Schnittstelle_VariableWertBereinigtZurueck(VORGEGEBENE_FILTER[liste][vorgegebene_filter_id].filtern);

    // Komplette Neu-Definition von filtern_prio_hoch
    // (Definition von filtern_prio_hoch ist nicht notwendig, weil Modal später sowieso geschlossen wird)
    const filtern_prio_hoch = new Object();
    $.each(Object.keys(filtern_vorgegeben), function (position, eigenschaft) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
            filtern_prio_hoch[eigenschaft] = filtern_vorgegeben[eigenschaft];
    });

    // Überschreiben des value mit geänderten filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch))
            .trigger("change");

    // Schließen des Modals
    Schnittstelle_DomModalSchliessen($vorgegebene_filter_auswahl.closest(".modal"));
}
