function Liste_WerkzeugAktualisieren($werkzeug, liste) {
    const instanz = $werkzeug.attr("data-instanz");
    if ($werkzeug.hasClass("btn_filtern_modal_oeffnen")) {
        const filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".liste").attr("data-filtern"), new Object());
        const filtern_prio_hoch = LISTEN[liste].instanz[instanz].filtern;

        if (instanz == "rueckmeldungen_termin" /* todo */ || instanz == "anwesenheiten_termin" /* todo */)
            $werkzeug
                .attr(
                    "data-filtern_prio_niedrig",
                    JsonStringifiedZurueck(
                        Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".auswertungen").attr("data-liste"), {
                            filtern: new Object(),
                        }).filtern
                    )
                )
                .val(JsonStringifiedZurueck(filtern_prio_hoch));
        else $werkzeug.attr("data-filtern_prio_niedrig", JsonStringifiedZurueck(filtern_prio_niedrig)).val(JsonStringifiedZurueck(filtern_prio_hoch));

        if (
            Object.keys(filtern_prio_hoch).length > 0 &&
            instanz != "rueckmeldungen_termin" /* todo */ &&
            instanz != "anwesenheiten_termin" /* todo */
        )
            $werkzeug
                .addClass("position-relative")
                .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
        else $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    } else if ($werkzeug.hasClass("btn_sortieren_modal_oeffnen")) {
        const sortieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".liste").attr("data-sortieren"), undefined);
        const sortieren_prio_hoch = LISTEN[liste].instanz[instanz].sortieren;

        if (instanz == "rueckmeldungen_termin" /* todo */ || instanz == "anwesenheiten_termin" /* todo */)
            $werkzeug
                .attr(
                    "data-sortieren_prio_niedrig",
                    JsonStringifiedZurueck(
                        Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".auswertungen").attr("data-liste"), {
                            sortieren: undefined,
                        }).sortieren
                    )
                )
                .val(JsonStringifiedZurueck(sortieren_prio_hoch));
        else
            $werkzeug
                .attr("data-sortieren_prio_niedrig", JsonStringifiedZurueck(sortieren_prio_niedrig))
                .val(JsonStringifiedZurueck(sortieren_prio_hoch));

        if (
            typeof sortieren_prio_hoch !== "undefined" &&
            instanz != "rueckmeldungen_termin" /* todo */ &&
            instanz != "anwesenheiten_termin" /* todo */
        )
            $werkzeug
                .addClass("position-relative")
                .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
        else $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    } else if ($werkzeug.hasClass("btn_gruppieren_modal_oeffnen")) {
        const gruppieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".liste").attr("data-gruppieren"), undefined);
        const gruppieren_prio_hoch = LISTEN[liste].instanz[instanz].gruppieren;

        if (instanz == "rueckmeldungen_termin" /* todo */ || instanz == "anwesenheiten_termin" /* todo */)
            $werkzeug
                .attr(
                    "data-gruppieren_prio_niedrig",
                    JsonStringifiedZurueck(
                        Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz + ".auswertungen").attr("data-liste"), {
                            gruppieren: undefined,
                        }).gruppieren
                    )
                )
                .val(JsonStringifiedZurueck(gruppieren_prio_hoch));
        else
            $werkzeug
                .attr("data-gruppieren_prio_niedrig", JsonStringifiedZurueck(gruppieren_prio_niedrig))
                .val(JsonStringifiedZurueck(gruppieren_prio_hoch));

        if (
            typeof gruppieren_prio_hoch !== "undefined" &&
            instanz != "rueckmeldungen_termin" /* todo */ &&
            instanz != "anwesenheiten_termin" /* todo */
        )
            $werkzeug
                .addClass("position-relative")
                .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
        else $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    }
}
