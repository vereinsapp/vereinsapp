/**
 * @param {JQuery} $listenstatistik
 * @param {JQuery} $liste
 */

function Liste_Liste$ListenstatistikAktualisieren($listenstatistik, $liste) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("liste"), undefined);

    switch ($listenstatistik.attr("listenstatistik")) {
        case "anzahl":
            $listenstatistik.text($liste.children().length);
            break;
        case "angewaehlt":
            /* funktioniert aktuell nicht, weil Liste_$ListeAktualisieren inkl. Liste_Liste$ListenstatistikAktualisieren aufgerufen wird,
             * bevor Liste_$ElementAktualisieren inkl. Liste_$VerknuepfungenAktualisieren aufgerufen wird
             */
            $listenstatistik.text($liste.find(".form-check-input.werkzeug:checked").length);
            break;
        case "summe":
            const eigenschaft = $listenstatistik.attr("eigenschaft");
            if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                let summe = 0;
                $liste.children().each(function () {
                    summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr(LISTEN[liste].element + "_id"), liste, 0));
                });
                $listenstatistik.text(Liste_WertNachEigenschaftFormatiertZurueck(summe, eigenschaft, liste));
            }
            break;
    }
}
