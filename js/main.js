document.getElementById('myForm').addEventListener('submit', saveBookmark);



//save bookmarker
function saveBookmark(e) {
    //GEt form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    // if (!siteName || !siteUrl) {
    //     alert('Pleas fill the form');
    //     return false;
    // }
    // var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    // var regex = new RegExp(expression);

    // if (!siteUrl.match(regex)) {
    //     alert('Please use a valid URL');
    //     return false;
    // }

    //Make bookmark object to store values in array method
    var bookmark = {
            name: siteName,
            url: siteUrl
        }
        //Now save the name and url in local Storage

    // localStorage.setItem('test', 'Hello World');
    // console.log(localStorage.getItem('test'));

    //First we check there is any data in the local storage if their exist any data then add to the array otherwise get it
    if (localStorage.getItem('bookmarks') == null) {
        //init array
        var bookmarks = [];
        bookmarks.push(bookmark);
        // Array.from(bookmarks);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } //else there is any bookmark then
    else {
        //Get bookmarks from localstorage
        //json parse use to change string to json obj array into normal
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //clear form after submision
    document.getElementById('myForm').reset();
    //Re-fetch bookmark
    fetchBookmarks();
    //prevent default submit
    e.preventDefault();
}

//Delete bookMark function
function deleteBookmark(url) {
    //get bookMarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        //loop thrugh book mark
    for (let i = 0; i < bookmarks.length; i++) {

        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Reset the loop in localstorage after delete
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //Re-fetch bookmark
    fetchBookmarks();
}
//Fetch bookmarks
function fetchBookmarks() {
    //fetching from the local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    //buil our output

    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';

    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

// function addhttp(url) {
//     if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
//         url = "http://" + url;
//     }
//     return url;
// }