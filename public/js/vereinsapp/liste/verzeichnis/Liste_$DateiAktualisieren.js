/**
 * @param {JQuery} $datei
 */

function Liste_$DateiAktualisieren($datei) {
    const liste = Util_WertBereinigtZurueck($datei.attr("liste"), undefined);
    const datei = Util_WertBereinigtZurueck($datei.attr("datei"), undefined);
    const $verzeichnis = $datei.closest(".verzeichnis");

    // EIGENSCHAFTEN AKTUALISIEREN
    $datei.find(".beschriftung").text(datei);

    // TYP-SYMBOL VOR DER BESCHRIFTUNG AKTUALISIEREN
    $datei
        .find(".beschriftung")
        .siblings("i.bi")
        .each(function () {
            const datei = Util_WertBereinigtZurueck($datei.attr("datei"), undefined);
            const punkt = datei.lastIndexOf(".");
            const typ = datei.slice(punkt + 1);
            $(this).addClass("bi-" + SYMBOLE[typ]);
        });

    // LINK AKTUALISIEREN
    let link =
        BASE_URL +
        "storage/" +
        liste +
        "/" +
        Liste_ElementWertRausZurueck(
            "verzeichnis_basis",
            Util_WertBereinigtZurueck($verzeichnis.attr(LISTEN[liste].element + "_id"), undefined),
            liste,
            "",
        );
    $.each(Util_WertBereinigtZurueck($verzeichnis.attr("basis"), new Array()), function (position, unterverzeichnis) {
        link += unterverzeichnis;
    });
    link += datei;
    $datei.find("a.stretched-link").attr("href", link);
}
