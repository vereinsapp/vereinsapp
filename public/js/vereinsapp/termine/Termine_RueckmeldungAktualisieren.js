function Termine_RueckmeldungAktualisieren($btn_rueckmelden) {
    const $btn_rueckmeldung_detaillieren = $btn_rueckmelden.siblings(".btn_rueckmeldung_detaillieren");

    let data_werte = $btn_rueckmelden.attr("data-werte");
    if (typeof data_werte !== "undefined") data_werte = Schnittstelle_VariableWertBereinigtZurueck(data_werte);
    else data_werte = new Object();

    if (!("mitglied_id" in data_werte)) data_werte.mitglied_id = undefined;
    else {
        /* FEHLER */
    }
    const mitglied_id = Number(data_werte.mitglied_id);

    const termin_id = Number($btn_rueckmelden.closest('.element[data-liste="termine"]').attr("data-element_id"));

    let rueckmeldung_id = $btn_rueckmelden.attr("data-element_id");
    if (typeof rueckmeldung_id === "undefined")
        rueckmeldung_id = Liste_ElementIdZurueck(
            [
                { liste: "termine", element_id: termin_id },
                { liste: "mitglieder", element_id: mitglied_id },
            ],
            "rueckmeldungen"
        );
    if (typeof rueckmeldung_id !== "undefined") rueckmeldung_id = Number(rueckmeldung_id);

    if ($btn_rueckmelden.hasClass("zusagen")) {
        $btn_rueckmelden.attr("data-werte", JsonStringifiedZurueck({ termin_id: termin_id, mitglied_id: mitglied_id, status: 1 }));

        if (typeof rueckmeldung_id !== "undefined" && LISTEN.rueckmeldungen.tabelle[rueckmeldung_id].status == 1) {
            $btn_rueckmelden
                .prop("disabled", true)
                .removeClass("btn_rueckmeldung_aendern")
                .removeClass("btn_rueckmeldung_erstellen")
                .removeClass("w-100")
                .addClass("w-75")
                .removeClass("btn-outline-success")
                .addClass("btn-success")
                .removeClass("rounded-end")
                .removeClass("rounded-pill")
                .addClass("rounded-0")
                .text("ZUGESAGT");

            $btn_rueckmeldung_detaillieren.removeClass("invisible").attr("data-element_id", rueckmeldung_id);

            const bemerkung = LISTEN.rueckmeldungen.tabelle[rueckmeldung_id].bemerkung;
            if (typeof bemerkung !== "undefined" && bemerkung != null && bemerkung != "")
                $btn_rueckmeldung_detaillieren.removeClass("btn-outline-success").addClass("btn-success");
            else $btn_rueckmeldung_detaillieren.addClass("btn-outline-success").removeClass("btn-success");
        } else {
            $btn_rueckmelden
                .prop("disabled", false)
                .removeClass("btn_rueckmeldung_aendern")
                .addClass("btn_rueckmeldung_erstellen")
                .removeClass("w-75")
                .addClass("w-100")
                .removeClass("btn-success")
                .addClass("btn-outline-success")
                .removeClass("rounded-0")
                .addClass("rounded-end")
                .addClass("rounded-pill")
                .text("ZUSAGEN");
            if (typeof rueckmeldung_id !== "undefined")
                $btn_rueckmelden
                    .removeClass("btn_rueckmeldung_erstellen")
                    .addClass("btn_rueckmeldung_aendern")
                    .attr("data-element_id", rueckmeldung_id);

            $btn_rueckmeldung_detaillieren.addClass("invisible").removeClass("btn-success").addClass("btn-outline-success");
        }
    } else if ($btn_rueckmelden.hasClass("absagen")) {
        $btn_rueckmelden.attr("data-werte", JsonStringifiedZurueck({ termin_id: termin_id, mitglied_id: mitglied_id, status: 2 }));

        if (typeof rueckmeldung_id !== "undefined" && LISTEN.rueckmeldungen.tabelle[rueckmeldung_id].status == 2) {
            $btn_rueckmelden
                .prop("disabled", true)
                .removeClass("btn_rueckmeldung_aendern")
                .removeClass("btn_rueckmeldung_erstellen")
                .removeClass("w-100")
                .addClass("w-75")
                .removeClass("btn-outline-danger")
                .addClass("btn-danger")
                .removeClass("rounded-start")
                .removeClass("rounded-pill")
                .addClass("rounded-0")
                .text("ABGESAGT");

            $btn_rueckmeldung_detaillieren.removeClass("invisible").attr("data-element_id", rueckmeldung_id);

            const bemerkung = LISTEN.rueckmeldungen.tabelle[rueckmeldung_id].bemerkung;
            if (typeof bemerkung !== "undefined" && bemerkung != null && bemerkung != "")
                $btn_rueckmeldung_detaillieren.removeClass("btn-outline-danger").addClass("btn-danger");
            else $btn_rueckmeldung_detaillieren.addClass("btn-outline-danger").removeClass("btn-danger");
        } else {
            $btn_rueckmelden
                .prop("disabled", false)
                .removeClass("btn_rueckmeldung_aendern")
                .addClass("btn_rueckmeldung_erstellen")
                .removeClass("w-75")
                .addClass("w-100")
                .removeClass("btn-danger")
                .addClass("btn-outline-danger")
                .removeClass("rounded-0")
                .addClass("rounded-start")
                .addClass("rounded-pill")
                .text("ABSAGEN");
            if (typeof rueckmeldung_id !== "undefined")
                $btn_rueckmelden
                    .removeClass("btn_rueckmeldung_erstellen")
                    .addClass("btn_rueckmeldung_aendern")
                    .attr("data-element_id", rueckmeldung_id);

            $btn_rueckmeldung_detaillieren.addClass("invisible").removeClass("btn-danger").addClass("btn-outline-danger");
        }
    } else {
        /* FEHLER */
    }

    if (LISTEN.termine.tabelle[termin_id].start < DateTime.now().plus({ seconds: TERMINE_RUECKMELDUNG_FRIST })) {
        $btn_rueckmelden.prop("disabled", true);
        $btn_rueckmeldung_detaillieren.prop("disabled", true);
    }
}
