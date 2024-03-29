const STATUS_SPINNER_CLASS = "spinner-border spinner-border-sm";
const STATUS_SPINNER_HTML = '<span class="' + STATUS_SPINNER_CLASS + '" role="status"><span class="visually-hidden">Loading...</span></span>';

function Schnittstelle_DomInit() {
    const STATUS_STANDARD_HTML = $("#status").html();

    $(document).ajaxStart(function () {
        $("#status").html(STATUS_SPINNER_HTML);
    });

    $(document).ajaxStop(function () {
        $("#status").html(STATUS_STANDARD_HTML);
    });

    $(document).ajaxSuccess(function () {
        $("#status").removeClass("text-danger");
        $("#status").addClass("text-success");
    });

    $(document).ajaxError(function () {
        $("#status").removeClass("text-success");
        $("#status").addClass("text-danger");
    });

    $(window).on("beforeunload", function () {
        $("#status").html(STATUS_SPINNER_HTML);
    });

    $(".jetzt").each(function () {
        Schnittstelle_JetztAktualisieren($(this));
    });

    // WERKZEUGKASTEN (OFFCANVAS) ÖFFNEN
    $(document).on("show.bs.offcanvas", "#werkzeugkasten", function (event) {
        const $werkzeugkasten = $(this).find(".werkzeugkasten");
        const $btn_oeffnend = $(event.relatedTarget);
        const liste = $btn_oeffnend.attr("data-liste");
        const element_id = $btn_oeffnend.attr("data-element_id");

        $werkzeugkasten.find(".werkzeug").removeAttr("data-element_id");
        $werkzeugkasten.find(".werkzeug").removeAttr("data-gegen_element_id");

        if (typeof liste !== "undefined" && typeof element_id !== "undefined")
            $werkzeugkasten.find(".werkzeug").each(function () {
                const $werkzeug = $(this);
                if ($werkzeug.attr("data-liste") == liste) $werkzeug.attr("data-element_id", element_id);
                else $werkzeug.attr("data-gegen_element_id", element_id);
            });
    });

    // AKTIVE MODALS WERDEN GETRACKED
    $(document).on("show.bs.modal", ".modal", function (event) {
        const $modal = $(this);
        const modal_id = $modal.attr("id");
        const $btn_oeffnend = $(event.relatedTarget);

        const title_modal = $modal.find(".modal-title").first().attr("data-title");
        if (typeof title_modal !== "undefined") $modal.find(".modal-title").html(title_modal);
        else {
            const title_btn = $btn_oeffnend.attr("data-title");
            if (typeof title_btn !== "undefined") {
                $modal.find(".modal-title").attr("data-title", title_btn);
                $modal.find(".modal-title").text(title_btn);
            } else $modal.find(".modal-title").text("ERROR: Hier fehlt ein Titel");
        }

        if (G.MODALS.offen.length == 0 || G.MODALS.offen[G.MODALS.offen.length - 1].modal_id != modal_id) {
            G.MODALS.offen.push({ modal_id: modal_id, $btn_oeffnend: $btn_oeffnend });
        }
    });

    $(document).on("hidden.bs.modal", ".modal", function () {
        const $modal = $(this);

        const title_modal = $modal.find(".modal-title").html();
        if (typeof title_modal !== "undefined") $modal.find(".modal-title").first().attr("data-title", title_modal);

        if ($modal.attr("id") == G.MODALS.offen[G.MODALS.offen.length - 1].modal_id) {
            G.MODALS.offen.pop();
            if (G.MODALS.offen.length > 0) $("#" + G.MODALS.offen[G.MODALS.offen.length - 1].modal_id).modal("show");
        }
    });

    // PASSWORT ANZEIGEN
    $(document).on("click", ".passwort_anzeigen", function (event) {
        $btn = $(this);
        event.preventDefault();
        const feld = $btn.closest(".input-group").find("input.form-control");

        if (feld.attr("type") == "text") {
            feld.attr("type", "password");
            $btn.find("i").removeClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
            $btn.find("i").addClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
        } else if (feld.attr("type") == "password") {
            feld.attr("type", "text");
            $btn.find("i").removeClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
            $btn.find("i").addClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
        }
    });

    // INHALT KOPIEREN
    new ClipboardJS(".inhalt_kopieren");

    // VALIDATION-TOOLTIPS ENTFERNEN
    $(document).on("focus", "input, select", function () {
        $(this).next(".invalid-tooltip").remove();
    });

    // COLLAPSE ÖFFNEN
    $(document).on("show.bs.collapse", ".collapse", function (event) {
        $collapse = $(this);
        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                Schnittstelle_ToggleSymbol($(this));
            });
        }
    });

    // COLLAPSE SCHLIESSEN
    $(document).on("hide.bs.collapse", ".collapse", function (event) {
        $collapse = $(this);
        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                Schnittstelle_ToggleSymbol($(this));
            });
        }
    });
}

function Schnittstelle_BtnWartenStart($btn) {
    const beschriftung = $btn.html();
    $btn.attr("data-beschriftung", beschriftung);
    $btn.html(STATUS_SPINNER_HTML);

    $btn.prop("disabled", true);
}

function Schnittstelle_BtnWartenEnde($btn) {
    $btn.prop("disabled", false);

    const beschriftung = $btn.attr("data-beschriftung");
    $btn.prop("data-beschriftung", false);
    $btn.html(beschriftung);
}

function Schnittstelle_BtnDanebenWartenStart($btn) {
    $btn.after(STATUS_SPINNER_HTML);

    $btn.addClass("invisible");
    $btn.prop("disabled", true);
}

function Schnittstelle_BtnDanebenWartenEnde($btn) {
    $btn.prop("disabled", false);
    $btn.removeClass("invisible");

    $btn.siblings("." + STATUS_SPINNER_CLASS).remove();
}

function Schnittstelle_CheckWartenStart($check) {
    $check.prop("disabled", true);

    const $check_beschriftung = $check.siblings(".beschriftung");
    const beschriftung = $check_beschriftung.html();
    $check_beschriftung.attr("data-beschriftung", beschriftung);
    $check_beschriftung.html(STATUS_SPINNER_HTML);
    $check_beschriftung.addClass("text-primary");
}

function Schnittstelle_CheckWartenEnde($check) {
    const $check_beschriftung = $check.siblings(".beschriftung");
    const beschriftung = $check_beschriftung.attr("data-beschriftung");
    $check_beschriftung.prop("data-beschriftung", false);
    $check_beschriftung.removeClass("text-primary");
    $check_beschriftung.html(beschriftung);

    $check.prop("disabled", false);
}

function Schnittstelle_JetztAktualisieren($jetzt) {
    let format = "dd.MM.yyyy HH:mm:ss";
    const data_format = $jetzt.attr("data-format");
    if (typeof data_format !== "undefined") format = $jetzt.attr("data-format");
    $jetzt.text(DateTime.now().toFormat(format));
}

function Schnittstelle_ToggleSymbol($symbol) {
    const toggle_symbol_neu = $symbol.attr("data-toggle_symbol");

    let toggle_symbol_alt = undefined;
    $.each($symbol.attr("class").split(/\s+/), function (position, klasse) {
        if (klasse.slice(0, 3) == "bi-") {
            toggle_symbol_alt = klasse.slice(3, klasse.length);
            return false;
        }
    });

    if (typeof toggle_symbol_alt !== "undefined" && typeof toggle_symbol_neu !== "undefined")
        $symbol
            .removeClass("bi-" + toggle_symbol_alt)
            .addClass("bi-" + toggle_symbol_neu)
            .attr("data-toggle_symbol", toggle_symbol_alt);
}
