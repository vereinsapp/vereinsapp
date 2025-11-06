function Termine_RueckmeldungAktualisieren($btn_rueckmelden) {
    const $btn_rueckmeldung_detaillieren = $btn_rueckmelden.siblings(".btn_rueckmeldung_detaillieren");
    const termin_id = Schnittstelle_VariableWertBereinigtZurueck(
        $btn_rueckmelden.closest('.element[data-liste="termine"]').attr("data-element_id"),
        undefined
    );
    const mitglied_id = Schnittstelle_VariableWertBereinigtZurueck($btn_rueckmelden.attr("data-werte"), { mitglied_id: undefined }).mitglied_id;
    const rueckmeldung_id = Schnittstelle_VariableWertBereinigtZurueck(
        $btn_rueckmelden.attr("data-element_id"),
        Liste_ElementIdZurueck(
            [
                { liste: "termine", element_id: termin_id },
                { liste: "mitglieder", element_id: mitglied_id },
            ],
            "rueckmeldungen"
        )
    );
    const bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", rueckmeldung_id, "rueckmeldungen", null);

    if ($btn_rueckmelden.hasClass("zusagen")) {
        $btn_rueckmelden.attr("data-werte", JsonStringifiedZurueck({ termin_id: termin_id, mitglied_id: mitglied_id, status: 1 }, new Object()));

        if (
            typeof rueckmeldung_id !== "undefined" &&
            Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "rueckmeldungen", undefined) == 1
        ) {
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

            if (bemerkung !== null) $btn_rueckmeldung_detaillieren.removeClass("btn-outline-success").addClass("btn-success");
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
        $btn_rueckmelden.attr("data-werte", JsonStringifiedZurueck({ termin_id: termin_id, mitglied_id: mitglied_id, status: 2 }, new Object()));

        if (
            typeof rueckmeldung_id !== "undefined" &&
            Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "rueckmeldungen", undefined) == 2
        ) {
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

            if (bemerkung !== null) $btn_rueckmeldung_detaillieren.removeClass("btn-outline-danger").addClass("btn-danger");
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

    if (Schnittstelle_VariableRausZurueck("start", termin_id, "termine", undefined) < DATETIME.now().plus({ seconds: TERMINE_RUECKMELDUNG_FRIST })) {
        $btn_rueckmelden.prop("disabled", true);
        $btn_rueckmeldung_detaillieren.prop("disabled", true);
    }
}
