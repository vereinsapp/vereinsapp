function Liste_ListenstatistikAktualisieren($listenstatistik, liste) {
    const $listenstatistik_sammler = $listenstatistik.closest(".listenstatistik_sammler");
    const instanz = $listenstatistik.attr("data-instanz");
    const $liste = $("#" + instanz + ".liste");

    if ($liste.children().length === 0) $listenstatistik_sammler.addClass("invisible");
    else {
        $listenstatistik_sammler.removeClass("invisible");

        switch ($listenstatistik.attr("data-listenstatistik")) {
            case "anzahl": {
                $listenstatistik.text($liste.children().length);
                break;
            }
            case "angewaehlt": {
                $listenstatistik.text($liste.find(".check:checked").length);
                break;
            }
            case "summe": {
                const eigenschaft = $listenstatistik.attr("data-eigenschaft");
                if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                    let summe = 0;
                    $liste.children().each(function () {
                        summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr("data-element_id"), liste, 0));
                    });
                    $listenstatistik.text(Liste_WertFormatiertZurueck(summe, eigenschaft, liste));
                }
                break;
            }
            case "durchschnitt": {
                const eigenschaft = $listenstatistik.attr("data-eigenschaft");
                if (typeof instanz !== "undefined" && typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                    let summe = 0;
                    $liste.children().each(function () {
                        summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr("data-element_id"), liste, 0));
                    });
                    $listenstatistik.text(Liste_WertFormatiertZurueck(summe / $liste.children().length, eigenschaft, liste));
                }
            }
        }
    }
}
