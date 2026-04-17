/**
 */

function Serverdata_ServerdataHolen() {
    Ajax_InDieSchlange(
        "einstellungen/ajax_tabellen",
        new Object(),
        new Object(),
        function (AJAX) {
            // rein_validation_pos_aktion:
            $.each(SERVERDATA_HOLEN_EVENTS, function () {
                if (typeof this === "function") this(AJAX);
            });
        },
        function (AJAX) {
            // rein_validation_neg_aktion:
        },
    );
}
