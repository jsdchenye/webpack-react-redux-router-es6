let ajaxPromise = function (ajaxurl, {args={}, type='get'}={}) {
    ajaxurl = '/partner' + ajaxurl;
    let promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: ajaxurl,
            data: args,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            type: type,
            success: function(data) {
                resolve(data);
            },
            error: function(data) {
                reject(data);
            }
        });
    });

    return promise;
};

export default ajaxPromise;