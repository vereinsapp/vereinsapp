/**
 * @param {JQuery} $listenstatistik
 * @param {JQuery} $liste
 */

function Liste_$ListenstatistikAktualisieren($listenstatistik, $liste) {
    const liste = Util_WertBereinigtZurueck($liste.attr("liste"), undefined);

    switch ($listenstatistik.attr("listenstatistik")) {
        case "anzahl":
            $listenstatistik.text($liste.find(".elemente").find(".element").length);
            break;
        case "summe":
            const eigenschaft = Util_WertBereinigtZurueck($listenstatistik.attr("eigenschaft"), undefined);
            if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                let summe = 0;
                $liste
                    .find(".elemente")
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
}
