function clearInput(obj) {
    $(obj).prev().val("");
    $(obj).remove();
}

function showClear(obj) {

    if (obj.value != '') {
        if (!$(obj).next('span').hasClass('addSpan')) {
            $(obj).after('<span class="addSpan" style="font-size:0.8rem;color: #bbb; position: absolute; margin:0.23rem 0 0 -1rem;cursor: pointer; " onclick="clearInput(this)">×</span>');
            $(obj).parent().css('position','relative');
        }

    } else {
        $(obj).next().hide();
    }
}