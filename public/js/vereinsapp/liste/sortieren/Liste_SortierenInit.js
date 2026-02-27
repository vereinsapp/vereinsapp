/**
 */

WERKZEUGE.sortieren_manip.aktualisieren_aktion = function ($werkzeug) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("data-instanz"), undefined);
    const sortieren_basis = Schnittstelle_VariableWertBereinigtZurueck(
        $("#" + instanz + "[data-liste=" + liste + "]").attr("data-sortieren"),
        undefined,
    );
    const sortieren_manip = LISTEN[liste].instanz[instanz].sortieren;

    $werkzeug
        .attr("data-modal_title", LISTEN[liste].beschriftung + " " + WERKZEUGE.sortieren_manip.symbol)
        .attr("data-sortieren_basis", JsonStringifiedZurueck(sortieren_basis, undefined))
        .val(JsonStringifiedZurueck(sortieren_manip, undefined));

    if ($("#" + instanz + "[data-liste=" + liste + "]").children().length === 0) $werkzeug.addClass("invisible");
    else $werkzeug.removeClass("invisible");

    // ROTER PUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    if (isObject(sortieren_manip) && Object.keys(sortieren_manip).length > 0)
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
};

function Liste_SortierenInit() {
    // SORTIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", '.werkzeug[data-werkzeug="sortieren_manip"][data-liste][data-instanz]', function () {
        Liste_$SortierenLocalStorageSpeichern($(this));
    });

    // SORTIEREN MODAL ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="sortieren_manip"]', function () {
        Liste_$SortierenModalOeffnen($(this));
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft", function () {
        Liste_$SortierenEigenschaftAendern($(this));
    });

    // SORTIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".werkzeug[data-werkzeug=sortieren_eigenschaft_zuruecksetzen]", function () {
        Liste_$SortierenEigenschaftZuruecksetzen($(this).closest(".sortieren_eigenschaft"));
    });
}
