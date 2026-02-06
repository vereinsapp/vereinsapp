/**
 */

const GRUPPIEREN = new Object();

GRUPPIEREN.$gruppieren_manip_aktualisieren_aktion = function ($gruppieren_manip) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-instanz"), undefined);
    const gruppieren_basis = Schnittstelle_VariableWertBereinigtZurueck(
        $("#" + instanz + "[data-liste=" + liste + "]").attr("data-gruppieren"),
        undefined,
    );
    const gruppieren_manip = LISTEN[liste].instanz[instanz].gruppieren;

    $gruppieren_manip
        .attr("data-gruppieren_basis", JsonStringifiedZurueck(gruppieren_basis, undefined))
        .val(JsonStringifiedZurueck(gruppieren_manip, undefined));

    // ROTER PUNKT AKTUALISIEREN
    $gruppieren_manip.removeClass("position-relative").find("span.position-absolute").remove();
    if (typeof gruppieren_manip !== "undefined" && gruppieren_manip.length > 0)
        $gruppieren_manip
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
};

function Liste_GruppierenInit() {
    // GRUPPIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".gruppieren_localstorage", function () {
        Liste_$GruppierenLocalStorageSpeichern($(this));
    });

    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_gruppieren_manip", function () {
        Liste_$GruppierenModalOeffnen($(this));
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_$GruppierenEigenschaftAendern($(this));
    });

    // GRUPPIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_gruppieren_eigenschaft_zuruecksetzen", function () {
        Liste_$GruppierenEigenschaftZuruecksetzen($(this).closest(".gruppieren_eigenschaft"));
    });
}
