/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftAktualisieren($sortieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.attr("data-liste"), undefined);
    const $sortieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_eigenschaft);

    // Definition von sortieren_eigenschaft
    const sortieren_eigenschaft = Liste_SortierenMitPrioKombiniertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.attr("data-sortieren_prio_niedrig"), undefined),
        Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.val(), undefined),
        liste,
    );
    let eigenschaft, richtung;
    if (typeof sortieren_eigenschaft !== "undefined") {
        eigenschaft = sortieren_eigenschaft.eigenschaft;
        richtung = sortieren_eigenschaft.richtung;
    }

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            // Aktualisieren der $sortieren_eigenschaft
            $sortieren_eigenschaft.find(".sortieren_wert").val(eigenschaft);
            $sortieren_eigenschaft.find(".sortieren_richtung").prop("checked", false);
            $sortieren_eigenschaft.find('.sortieren_richtung[value="' + richtung + '"]').prop("checked", true);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$SortierenEigenschaftAktualisieren: Eigenschaft " +
                    eigenschaft +
                    " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                    liste +
                    "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$SortierenEigenschaftAktualisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
