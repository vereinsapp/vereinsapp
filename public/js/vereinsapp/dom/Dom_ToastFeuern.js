function Dom_ToastFeuern(nachricht, farbe = "success") {
    const $toasts = $("#toasts");

    const $toast = TOASTS.$blanko_toast.clone().removeClass("blanko invisible");
    $toast.addClass("border-" + farbe);
    $toast
        .find(".toast-body")
        .addClass("text-" + farbe)
        .text(nachricht);

    $toast.appendTo($toasts);

    const toast = bootstrap.Toast.getOrCreateInstance($toast);
    toast.show();
}
