/**
 * @param {JQuery} $zusatzinfo
 * @param {JQuery} $element
 */

function Liste_ElementZusatzinfoAktualisieren($zusatzinfo, $element) {
    // const liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-liste"), undefined);
    const zusatzinfo = Schnittstelle_VariableWertBereinigtZurueck($zusatzinfo.attr("data-zusatzinfo"), undefined);

    // $zusatzinfo.find('[data-bs-toggle="popover"]').popover("hide");
    $zusatzinfo.empty();

    switch (zusatzinfo) {
        // Zusatzinfo für mitglied_zugeordnete_aufgaben_eingeplant
        case "mitglied_zugeordnete_aufgaben_eingeplant":
            // let anzahl_eingeplant = 0;
            // $.each($('#.liste[data-liste="aufgaben"]').find(".element"), function () {
            //     if (
            //         Schnittstelle_VariableRausZurueck(
            //             "mitglied_id",
            //             Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined),
            //             "aufgaben",
            //             undefined,
            //         ) === Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-mitglied_id"), undefined)
            //     )
            //         anzahl_eingeplant++;
            // });
            // $zusatzinfo.html('<span class="text-primary">' + anzahl_eingeplant + '<i class="bi bi-' + SYMBOLE["aufgaben"]["bootstrap"] + '"></span>');
            break;
        // Zusatzinfo für mitglied_zugeordnete_aufgaben_erledigt
        case "mitglied_zugeordnete_aufgaben_erledigt":
            // let anzahl_erledigt = 0;
            // $.each($('#.liste[data-liste="aufgaben"]').find(".element"), function () {
            //     const aufgabe_id = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-aufgabe_id"), undefined);
            //     if (
            //         Schnittstelle_VariableRausZurueck("mitglied_id", aufgabe_id, "aufgaben", undefined) ===
            //             Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-mitglied_id"), undefined) &&
            //         Schnittstelle_VariableRausZurueck("erledigt_janein", aufgabe_id, "aufgaben", null)
            //     )
            //         anzahl_erledigt++;
            // });
            // $zusatzinfo.html('<span class="text-success">' + anzahl_erledigt + '<i class="bi bi-' + SYMBOLE["erledigt"]["bootstrap"] + '"></span>');
            break;
    }
}
