/**
 */

WERKZEUGE.sortieren_manip.aktualisieren_aktion = function ($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined);
    const sortieren_basis = Util_WertBereinigtZurueck($("#" + instanz + "[liste=" + liste + "]").attr("sortieren"), undefined);
    const sortieren_manip = LISTEN[liste].instanz[instanz].sortieren;

    $werkzeug
        .attr("modal_title", LISTEN[liste].beschriftung + " " + WERKZEUGE.sortieren_manip.symbol)
        .attr("sortieren_basis", JsonStringifiedZurueck(sortieren_basis, undefined))
        .val(JsonStringifiedZurueck(sortieren_manip, undefined));

    if (
        $("#" + instanz + "[liste=" + liste + "]")
            .find(".elemente")
            .find(".element").length === 0
    )
        $werkzeug.addClass("invisible");
    else $werkzeug.removeClass("invisible");

    // ROTER PUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    if (isObject(sortieren_manip) && Object.keys(sortieren_manip).length > 0)
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-1 translate-middle p-1 bg-danger border border-danger rounded-circle">');
};

function Liste_SortierenInit() {
    // SORTIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", '.werkzeug[werkzeug="sortieren_manip"][liste][instanz]', function () {
        Liste_$SortierenLocalStorageSpeichern($(this));
    });

    // SORTIEREN MODAL ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="sortieren_manip"]', function () {
        Liste_$SortierenModalOeffnen($(this));
    });

    // SORTIEREN ÄNDERN
    $(document).on("change", ".sortieren_eigenschaft", function () {
        Liste_$SortierenEigenschaftAendern($(this));
    });

    // SORTIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".werkzeug[werkzeug=sortieren_eigenschaft_zuruecksetzen]", function () {
        Liste_$SortierenEigenschaftZuruecksetzen($(this).closest(".sortieren_eigenschaft"));
    });
}
