/**
 */

function Serverdata_ServerdataHolen() {
    Ajax_InDieSchlange(
        "einstellungen/ajax_serverdata_holen",
        new Object(),
        new Object(),
        function (AJAX) {
            // rein_validation_pos_aktion:
            $.each(SERVERDATA_HOLEN_EVENTS, function () {
                if (typeof this === "function") this(AJAX);
            });

            $.each(SERVERDATA_BEREITSTELLEN_EVENTS, function () {
                if (typeof this === "function") this();
            });

            $.each(DOM_AKTUALISIEREN_EVENTS, function () {
                if (typeof this === "function") this();
            });
        },
        function (AJAX) {
            // rein_validation_neg_aktion:
        },
    );
}
