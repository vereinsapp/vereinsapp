/**
 * @param {JQuery} $datei
 */

function Liste_$DateiAktualisieren($datei) {
    const liste = Util_WertBereinigtZurueck($datei.attr("liste"), undefined);
    const datei = $datei.attr("datei");
    const $verzeichnis = $datei.closest(".verzeichnis");

    // const punkt = datei.lastIndexOf(".");
    // const typ = datei.slice(punkt + 1);

    let link =
        BASE_URL +
        "storage/" +
        liste +
        "/" +
        Liste_VariableRausZurueck(
            "verzeichnis_basis",
            Util_WertBereinigtZurueck($verzeichnis.attr(LISTEN[liste].element + "_id"), undefined),
            liste,
            "",
        );
    $.each(Util_WertBereinigtZurueck($verzeichnis.attr("basis"), new Array()), function (position, unterverzeichnis) {
        link += unterverzeichnis;
    });
    link += datei;

    // EIGENSCHAFTEN AKTUALISIEREN
    $datei.find(".beschriftung").text(datei);

    // WERKZEUGKASTEN AKTUALISIEREN
    // $datei.find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]').attr("datei", datei);

    // LINK AKTUALISIEREN
    $datei.find("a.stretched-link").attr("href", link);

    // AUDIO AKTUALISIEREN
    // if (typ == "mp3")
    //     $datei
    //         .find(".audio")
    //         .html(
    //             '<audio controls class="float-end ms-1" style="width: 50px; height:20px;" src="' +
    //                 link +
    //                 '" type="audio/mpeg"></audio>'
    //         );

    // ZUSATZSYMBOL AKTUALISIEREN
    $datei.find(".zusatzsymbol").each(function () {
        Liste_Element$ZusatzsymbolAktualisieren($(this), $datei);
    });
}
