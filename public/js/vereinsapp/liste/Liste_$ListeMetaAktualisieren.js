/**
 * @param {JQuery} $meta
 * @param {string} instanz
 * @param {string} liste
 */

function Liste_$ListeMetaAktualisieren($meta, instanz, liste) {
    // Überschrift aktualisieren
    $meta.find(".ueberschrift").each(function () {
        const $ueberschrift = $(this);

        if (isEmptyString($ueberschrift.text())) $ueberschrift.addClass("invisible");
        else $ueberschrift.removeClass("invisible");
    });

    // Werkzeuge aktualisieren
    $meta.find(".werkzeuge").each(function () {
        const $werkzeuge = $(this);

        Dom_$WerkzeugeAktualisieren($werkzeuge, {
            liste: liste,
            instanz: instanz,
        });

        if ($werkzeuge.find(".werkzeug").length === 0) $werkzeuge.addClass("invisible");
        else $werkzeuge.removeClass("invisible");
    });

    // Listenstatisik aktualisieren
    $meta.find(".listenstatistiken").each(function () {
        const $listenstatistiken = $(this);

        $listenstatistiken.find(".listenstatistik").each(function () {
            const $listenstatistik = $(this);

            switch ($listenstatistik.attr("listenstatistik")) {
                case "anzahl":
                    $listenstatistik.text(
                        $("#" + instanz + ".liste[liste=" + liste + "]")
                            .find(".liste_elemente")
                            .find(".element").length,
                    );
                    break;
                case "summe":
                    const eigenschaft = Util_WertBereinigtZurueck($listenstatistik.attr("eigenschaft"), undefined);
                    if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                        let summe = 0;
                        $("#" + instanz + ".liste[liste=" + liste + "]")
                            .find(".liste_elemente")
                            .find(".element")
                            .each(function () {
                                summe += Liste_ElementWertRausZurueck(
                                    eigenschaft,
                                    Util_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id"), undefined),
                                    liste,
                                    0,
                                );
                            });
                        $listenstatistik.text(Liste_WertNachEigenschaftFormatiertZurueck(summe, eigenschaft, liste));
                    }
                    break;
            }
        });

        if ($listenstatistiken.find(".listenstatistik").length === 0) $listenstatistiken.addClass("invisible");
        else $listenstatistiken.removeClass("invisible");
    });

    if (
        ($meta.find(".ueberschrift").length === 0 || $meta.find(".ueberschrift").hasClass("invisible")) &&
        ($meta.find(".werkzeuge").length === 0 || $meta.find(".werkzeuge").hasClass("invisible")) &&
        ($meta.find(".listenstatistiken").length === 0 || $meta.find(".listenstatistiken").hasClass("invisible"))
    )
        $meta.addClass("invisible");
    else $meta.removeClass("invisible");
}
