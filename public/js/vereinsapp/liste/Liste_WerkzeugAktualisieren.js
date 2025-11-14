function Liste_WerkzeugAktualisieren($werkzeug, liste) {
    const instanz = $werkzeug.attr("data-instanz");
    let batch_hinzu = false;
    if ($werkzeug.hasClass("btn_filtern_modal_oeffnen")) {
        const filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz).attr("data-filtern"), new Object());
        const filtern_prio_hoch = LISTEN[liste].instanz[instanz].filtern;

        $werkzeug
            .attr("data-filtern_prio_niedrig", JsonStringifiedZurueck(filtern_prio_niedrig, new Object()))
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()));

        if (Object.keys(filtern_prio_hoch).length > 0) batch_hinzu = true;
        else batch_hinzu = false;
    } else if ($werkzeug.hasClass("btn_sortieren_modal_oeffnen")) {
        const sortieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz).attr("data-sortieren"), undefined);
        const sortieren_prio_hoch = LISTEN[liste].instanz[instanz].sortieren;

        $werkzeug
            .attr("data-sortieren_prio_niedrig", JsonStringifiedZurueck(sortieren_prio_niedrig, undefined))
            .val(JsonStringifiedZurueck(sortieren_prio_hoch, undefined));

        if (typeof sortieren_prio_hoch !== "undefined") batch_hinzu = true;
        else batch_hinzu = false;
    } else if ($werkzeug.hasClass("btn_gruppieren_modal_oeffnen")) {
        const gruppieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + instanz).attr("data-gruppieren"), undefined);
        const gruppieren_prio_hoch = LISTEN[liste].instanz[instanz].gruppieren;

        $werkzeug
            .attr("data-gruppieren_prio_niedrig", JsonStringifiedZurueck(gruppieren_prio_niedrig, undefined))
            .val(JsonStringifiedZurueck(gruppieren_prio_hoch, undefined));

        if (typeof gruppieren_prio_hoch !== "undefined") batch_hinzu = true;
        else batch_hinzu = false;
    }

    if (batch_hinzu)
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-danger border border-danger rounded-circle">');
    else $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
}
