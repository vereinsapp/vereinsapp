/**
 */

const FILTERN = new Object();

WERKZEUGE.filtern_manip.aktualisieren_aktion = function ($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined);
    const filtern_basis = Util_WertBereinigtZurueck($("#" + instanz + "[liste=" + liste + "]").attr("filtern"), new Object());
    const filtern_manip = LISTEN[liste].instanz[instanz].filtern;

    $werkzeug
        .attr("modal_title", LISTEN[liste].beschriftung + " " + WERKZEUGE.filtern_manip.symbol)
        .attr("filtern_basis", JsonStringifiedZurueck(filtern_basis, new Object()))
        .val(JsonStringifiedZurueck(filtern_manip, new Object()));

    // ROTER PUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    if (Object.keys(filtern_manip).length > 0)
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
};

function Liste_FilternInit() {
    // FILTERN-WERT IN FILTERN BEREITSTELLEN
    $.each(BLANKOS.filtern_wert, function (position, $blanko) {
        FILTERN.$blanko_filtern_wert = $blanko;
    });

    // FILTERN-EIGENSCHAFT IN FILTERN BEREITSTELLEN
    $.each(BLANKOS.filtern_eigenschaft, function (position, $blanko) {
        const typ = $blanko.attr("typ");
        $blanko.removeAttr("typ");

        if (!("$blanko_filtern_eigenschaft" in FILTERN)) FILTERN.$blanko_filtern_eigenschaft = new Object();
        FILTERN.$blanko_filtern_eigenschaft[typ] = $blanko;
    });

    // FILTERN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", '.werkzeug[werkzeug="filtern_manip"][liste][instanz]', function () {
        Liste_$FilternLocalStorageSpeichern($(this));
    });

    // FILTERN MODAL ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="filtern_manip"]', function () {
        Liste_$FilternModalOeffnen($(this));
    });

    // VORGEGEBENE FILTER AUSWÄHLEN
    $(document).on("change", ".filtern_vorgegeben", function (e) {
        Liste_$FilternVorgegebenAuswaehlen($(this), Util_WertBereinigtZurueck($(e.target).val(), undefined));
    });

    // FILTERN ÄNDERN
    $(document).on("change", ".filtern_eigenschaft", function () {
        Liste_$FilternEigenschaftAendern($(this));
    });

    // FILTERN WERT ZWISCHEN INKLUSIV UND EXKLUSIV VERSCHIEBEN
    $(document).on("click", ".werkzeug[werkzeug=filtern_wert_inklusiv_exklusiv]", function () {
        Liste_$FilternEigenschaftWertInExklusivAendern(
            $(this).closest(".filtern_eigenschaft"),
            Util_WertBereinigtZurueck($(this).closest(".filtern_wert").attr("wert"), undefined),
        );
    });

    // FILTERN WERT LOESCHEN
    $(document).on("click", ".werkzeug[werkzeug=filtern_wert_loeschen]", function () {
        Liste_$FilternEigenschaftWertLoeschen(
            $(this).closest(".filtern_eigenschaft"),
            Util_WertBereinigtZurueck($(this).closest(".filtern_wert").attr("wert"), undefined),
        );
    });

    // FILTERN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".werkzeug[werkzeug=filtern_eigenschaft_zuruecksetzen]", function () {
        Liste_$FilternEigenschaftZuruecksetzen($(this).closest(".filtern_eigenschaft"));
    });
}
