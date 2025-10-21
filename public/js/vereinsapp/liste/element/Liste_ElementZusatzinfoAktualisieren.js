function Liste_ElementZusatzinfoAktualisieren($zusatzinfo, $element) {
    const liste = $element.attr("data-liste");
    const element_id = Number($element.attr("data-element_id"));
    const zusatzinfo = $zusatzinfo.attr("data-zusatzinfo");

    // $zusatzinfo.find('[data-bs-toggle="popover"]').popover("hide");
    $zusatzinfo.empty();

    switch (zusatzinfo) {
        // Zusatzinfo für mitglied_zugeordnete_aufgaben_eingeplant
        case "mitglied_zugeordnete_aufgaben_eingeplant":
            let anzahl_eingeplant = 0;
            $.each($('#alle_aufgaben.liste, .liste[data-liste="aufgaben"]').find(".element"), function () {
                const aufgabe_id = Number($(this).attr("data-element_id"));
                if (Schnittstelle_VariableRausZurueck("mitglied_id", aufgabe_id, "aufgaben") === element_id) anzahl_eingeplant++;
            });
            $zusatzinfo.html('<span class="text-primary">' + anzahl_eingeplant + '<i class="bi bi-' + SYMBOLE["aufgaben"]["bootstrap"] + '"></span>');
            break;
        // Zusatzinfo für mitglied_zugeordnete_aufgaben_erledigt
        case "mitglied_zugeordnete_aufgaben_erledigt":
            let anzahl_erledigt = 0;
            $.each($('#alle_aufgaben.liste, .liste[data-liste="aufgaben"]').find(".element"), function () {
                const aufgabe_id = Number($(this).attr("data-element_id"));
                if (
                    Schnittstelle_VariableRausZurueck("mitglied_id", aufgabe_id, "aufgaben") === element_id &&
                    Schnittstelle_VariableRausZurueck("erledigt_janein", aufgabe_id, "aufgaben")
                )
                    anzahl_erledigt++;
            });
            $zusatzinfo.html('<span class="text-success">' + anzahl_erledigt + '<i class="bi bi-' + SYMBOLE["erledigt"]["bootstrap"] + '"></span>');
            break;
    }
}
