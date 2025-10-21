function Aufgaben_AufgabeAktualisieren($aufgabe) {
    const aufgabe_id = Number($aufgabe.attr("data-element_id"));
    const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", aufgabe_id, "aufgaben", null);
    const $btn_aufgabe_mitglied_einplanen = $aufgabe.find(".btn_aufgabe_mitglied_einplanen");
    const $btn_aufgabe_mitglied_ausplanen = $aufgabe.find(".btn_aufgabe_mitglied_ausplanen");
    const $btn_aufgabe_erledigen = $aufgabe.find(".btn_aufgabe_offen_erledigt_markieren");

    const $sichtbar = $aufgabe.find(".sichtbar");
    const $unsichtbar = $aufgabe.find(".unsichtbar");

    $btn_aufgabe_mitglied_einplanen.attr("data-aufgabe_id", aufgabe_id);
    $btn_aufgabe_mitglied_ausplanen.attr("data-aufgabe_id", aufgabe_id);
    $btn_aufgabe_erledigen.attr("data-aufgabe_id", aufgabe_id);

    if (mitglied_id === null) {
        // Wenn kein Mitglied eingeplant ist
        $btn_aufgabe_mitglied_einplanen
            .addClass("btn-outline-primary")
            .removeClass("btn-outline-success")
            .removeClass("btn-primary")
            .removeClass("btn-success")
            .removeClass("disabled");
        $btn_aufgabe_mitglied_ausplanen.appendTo($unsichtbar);
        $btn_aufgabe_erledigen.html('<i class="bi bi-' + SYMBOLE["offen_erledigt_markieren"]["bootstrap"] + '"></i>').appendTo($unsichtbar);

        $btn_aufgabe_mitglied_einplanen.html('<i class="bi bi-' + SYMBOLE["erstellen"]["bootstrap"] + '"></i>');
    } else {
        // Wenn ein Mitglied eingeplant ist

        if (Mitglieder_MitgliedBesitztRechtZurueck("aufgaben.verwaltung", ICH["id"]) || mitglied_id == ICH["id"]) {
            // Wenn das Recht zur Verwaltung der Aufgaben erteilt ist oder ich eingeplant bin
            if (Schnittstelle_VariableRausZurueck("erledigt_janein", aufgabe_id, "aufgaben", false)) {
                // Wenn die Aufgabe erledigt ist
                $btn_aufgabe_mitglied_einplanen
                    .removeClass("btn-outline-primary")
                    .removeClass("btn-outline-success")
                    .removeClass("btn-primary")
                    .addClass("btn-success")
                    .addClass("disabled");
                $btn_aufgabe_mitglied_ausplanen.appendTo($unsichtbar);
                $btn_aufgabe_erledigen
                    .html('<i class="bi bi-' + SYMBOLE["erledigt"]["bootstrap"] + '"></i>')
                    .removeClass("btn-outline-success")
                    .addClass("btn-success")
                    .appendTo($sichtbar);
            } else {
                // Wenn die Aufgabe nicht erledigt ist
                $btn_aufgabe_mitglied_einplanen
                    .removeClass("btn-outline-primary")
                    .removeClass("btn-outline-success")
                    .addClass("btn-primary")
                    .removeClass("btn-success");
                if (Mitglieder_MitgliedBesitztRechtZurueck("aufgaben.verwaltung", ICH["id"])) $btn_aufgabe_mitglied_einplanen.removeClass("disabled");
                else $btn_aufgabe_mitglied_einplanen.addClass("disabled");
                $btn_aufgabe_mitglied_ausplanen.appendTo($sichtbar);
                $btn_aufgabe_erledigen
                    .html('<i class="bi bi-' + SYMBOLE["offen_erledigt_markieren"]["bootstrap"] + '"></i>')
                    .addClass("btn-outline-success")
                    .removeClass("btn-success")
                    .appendTo($sichtbar);
            }
        } else {
            // Wenn das Recht zur Verwaltung der Aufgaben nicht erteilt ist und ich nicht eingeplant bin
            $btn_aufgabe_mitglied_einplanen
                .removeClass("btn-outline-primary")
                .removeClass("btn-outline-success")
                .addClass("btn-primary")
                .removeClass("btn-success")
                .addClass("disabled");
            $btn_aufgabe_mitglied_ausplanen.appendTo($unsichtbar);
            $btn_aufgabe_erledigen.html('<i class="bi bi-' + SYMBOLE["offen_erledigt_markieren"]["bootstrap"] + '"></i>').appendTo($unsichtbar);
        }

        $btn_aufgabe_mitglied_einplanen.text(Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder"));
    }
}
