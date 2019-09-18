let isSearchActive = false;
function toggleSearch() {
    if (isSearchActive) {
        $(".search-view").fadeOut();
    } else {
        $(".search-view").fadeIn();
    }
    isSearchActive = !isSearchActive;
}

function openDrawer() {
    $('.drawer-handle').toggleClass('open');
    $('.drawer-menu').toggleClass('open');
}

$(window).on("scroll", function() {
    if ($(window).scrollTop() > 50) {
        $(".floating-header").addClass("active");
    } else {
        $(".floating-header").removeClass("active");
    }
});

// Ajax post loader (called by load-more button)
function loadMorePosts(){
    var btn = document.querySelector('.load-more-posts button');
    var spinner = document.querySelector('.lds-ripple');
    var message = document.querySelector('.load-more-posts .message');
    
    // next link element
    var nextElement = document.querySelector('link[rel=next]');
    if (!nextElement){
        btn.style.display = "none";
        message.style.display = "block";
        return;
    };

    // post feed element
    var feedElements = document.querySelectorAll('.post-feed');
    var feedElement = feedElements[0];
    if (!feedElement) return;

    // disable button until post loads
    btn.disabled = true;
    btn.style.display = "none";

    // activate spinner
    spinner.style.display = "block";

    var xhr = new window.XMLHttpRequest();
    xhr.responseType = 'document';

    xhr.addEventListener('load', function(){
        // append contents
        var postElements = this.response.querySelectorAll('.post-card.small');
        postElements.forEach(function (item) {
            feedElement.appendChild(item);
        });

        // set next link
        var resNextElement = this.response.querySelector('link[rel=next]');
        if (resNextElement) {
            nextElement.href = resNextElement.href;
            btn.disabled = false;
            btn.style.display = "block";
            spinner.style.display = "none";
        } else {
            console.log("Reached end");
            message.style.display = "block";
            btn.style.display = "none";
            spinner.style.display = "none";
        }
    });

    xhr.open('GET', nextElement.href);
    xhr.send(null);
}