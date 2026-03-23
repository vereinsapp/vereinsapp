/**
 */

WERKZEUGE.gruppieren_manip.aktualisieren_aktion = function ($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined);
    const gruppieren_basis = Util_WertBereinigtZurueck($("#" + instanz + "[liste=" + liste + "]").attr("gruppieren"), undefined);
    const gruppieren_manip = LISTEN[liste].instanz[instanz].gruppieren;

    $werkzeug.attr("gruppieren_basis", JsonStringifiedZurueck(gruppieren_basis, undefined)).val(JsonStringifiedZurueck(gruppieren_manip, undefined));

    if (
        $("#" + instanz + "[liste=" + liste + "]")
            .find(".elemente, .auswertungen")
            .find(".element, .auswertung").length <= 1
    )
        $werkzeug.addClass("invisible"); // nicht 0, weil zusammenfassung noch mit dabei ist
    else $werkzeug.removeClass("invisible");

    // ROTER HINWEISPUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find(".hinweispunkt").remove();
    if (typeof gruppieren_manip !== "undefined") $werkzeug.addClass("position-relative").append(Dom_$HinweispunktInitialisiertZurueck("danger"));
};

function Liste_GruppierenInit() {
    // GRUPPIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", '.werkzeug[werkzeug="gruppieren_manip"][liste][instanz]', function () {
        Liste_$GruppierenLocalStorageSpeichern($(this));
    });

    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="gruppieren_manip"]', function () {
        Liste_$GruppierenModalOeffnen($(this));
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_$GruppierenEigenschaftAendern($(this));
    });

    // GRUPPIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".werkzeug[werkzeug=gruppieren_eigenschaft_zuruecksetzen]", function () {
        Liste_$GruppierenEigenschaftZuruecksetzen($(this).closest(".gruppieren_eigenschaft"));
    });
}
