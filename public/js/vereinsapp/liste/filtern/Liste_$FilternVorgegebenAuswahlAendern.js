/**
 * @param {JQuery} $filtern_vorgegeben_auswahl
 */

function Liste_$FilternVorgegebenAuswahlAendern($filtern_vorgegeben_auswahl) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_vorgegeben_auswahl.attr("data-liste"), undefined);
    const $filtern_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_vorgegeben_auswahl);
    const filtern_vorgegeben_id = Schnittstelle_VariableWertBereinigtZurueck($filtern_vorgegeben_auswahl.val(), undefined);

    let filtern_vorgegeben;
    if (liste in FILTERN_VORGEGEBEN && filtern_vorgegeben_id in FILTERN_VORGEGEBEN[liste])
        filtern_vorgegeben = FILTERN_VORGEGEBEN[liste][filtern_vorgegeben_id].filtern;
    else filtern_vorgegeben = new Object();

    // Komplette Neu-Definition von filtern_prio_hoch (Modal wird später sowieso geschlossen)
    const filtern_prio_hoch = new Object();
    $.each(Object.keys(filtern_vorgegeben), function (position, eigenschaft) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
            filtern_prio_hoch[eigenschaft] = filtern_vorgegeben[eigenschaft];
    });

    // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
    $filtern_prio.val(JsonStringifiedZurueck(filtern_prio_hoch, new Object())).trigger("change");

    // Aktualisieren der $filtern_eigenschaft entfällt, weil Modal direkt geschlossen wird
    Schnittstelle_Dom$ModalSchliessen($filtern_vorgegeben_auswahl.closest(".modal"));
}
