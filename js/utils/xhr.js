var XhrReq = function(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', encodeURI(url));
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Running XHR callback...');
            return cb(xhr.responseText);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };

    xhr.send();
}

export default XhrReq;
