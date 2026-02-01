/**
 * @param {JQuery} $listenstatistik
 * @param {JQuery} $liste
 */

function Liste_ListenstatistikAktualisieren($listenstatistik, $liste) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-liste"), undefined);

    switch ($listenstatistik.attr("data-listenstatistik")) {
        case "anzahl": {
            $listenstatistik.text($liste.children().length);
            break;
        }
        case "angewaehlt": {
            /* funktioniert aktuell nicht, weil Liste_Aktualisieren inkl. Liste_ListenstatistikAktualisieren aufgerufen wird,
             * bevor Liste_ElementAktualisieren inkl. Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren aufgerufen wird
             */
            $listenstatistik.text($liste.find(".chk_verknuepfung_erstellen:checked").length);
            break;
        }
        case "summe": {
            const eigenschaft = $listenstatistik.attr("data-eigenschaft");
            if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                let summe = 0;
                $liste.children().each(function () {
                    summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr("data-" + LISTEN[liste].element + "_id"), liste, 0));
                });
                $listenstatistik.text(Schnittstelle_VariableWertFormatiertZurueck(summe, eigenschaft, liste));
            }
            break;
        }
    }
}
