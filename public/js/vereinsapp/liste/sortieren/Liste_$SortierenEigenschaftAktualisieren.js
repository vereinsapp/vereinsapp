/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftAktualisieren($sortieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.attr("data-liste"), undefined);
    const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_eigenschaft);

    // Definition von sortieren_eigenschaft
    const sortieren_manipuliert = Liste_SortierenManipuliertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("data-sortieren_basis"), undefined),
        Schnittstelle_VariableWertBereinigtZurueck($werkzeug.val(), undefined),
        liste,
    );
    const sortieren_eigenschaft = { eigenschaft: undefined, richtung: undefined };
    $.each(sortieren_manipuliert, function (eigenschaft_richtung, wert) {
        if (eigenschaft_richtung in sortieren_eigenschaft) sortieren_eigenschaft[eigenschaft_richtung] = wert;
    });
    const eigenschaft = sortieren_eigenschaft.eigenschaft;

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            // Aktualisieren der $sortieren_eigenschaft
            $sortieren_eigenschaft.find(".sortieren_wert").val(eigenschaft);
            $sortieren_eigenschaft.find(".sortieren_richtung").prop("checked", false);
            $sortieren_eigenschaft.find('.sortieren_richtung[value="' + sortieren_eigenschaft.richtung + '"]').prop("checked", true);
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
