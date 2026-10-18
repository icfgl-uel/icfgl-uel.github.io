(function () {
    'use strict';

    var PAGE_COUNT = 116;
    var PAGE_WIDTH = 612;
    var PAGE_HEIGHT = 792;
    var locale = new URLSearchParams(window.location.search).get('lang') === 'vi' ? 'vi' : 'en';
    var text = locale === 'vi' ? {
        previous: 'Trang trước', next: 'Trang sau', zoomOut: 'Thu nhỏ', zoomIn: 'Phóng to',
        fullscreen: 'Toàn màn hình', exitFullscreen: 'Thoát toàn màn hình', openPdf: 'Mở PDF gốc',
        jump: 'Nhập số trang để đến', frontCover: 'Bìa trước', page: 'Trang',
        loading: 'Đang chuẩn bị kỷ yếu...', loadError: 'Không tải được thư viện lật trang.'
    } : {
        previous: 'Previous page', next: 'Next page', zoomOut: 'Zoom out', zoomIn: 'Zoom in',
        fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', openPdf: 'Open original PDF',
        jump: 'Enter a page number', frontCover: 'Front cover', page: 'Page',
        loading: 'Preparing the proceedings...', loadError: 'The page-flip reader could not be loaded.'
    };

    document.documentElement.lang = locale;
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
        var key = element.getAttribute('data-i18n');
        if (text[key]) element.textContent = text[key];
    });

    var book = document.getElementById('book-container');
    var bookStage = document.getElementById('book-stage');
    var loadingCard = document.getElementById('loading-card');
    var pageInfo = document.getElementById('page-info');
    var pageInput = document.getElementById('page-input');
    var progressBar = document.getElementById('progress-bar');
    var previousButton = document.getElementById('prev-button');
    var nextButton = document.getElementById('next-button');
    var zoomOutButton = document.getElementById('zoom-out-button');
    var zoomInButton = document.getElementById('zoom-in-button');
    var fullscreenButton = document.getElementById('fullscreen-button');
    var pdfLink = document.getElementById('pdf-link');

    function setLabel(element, label) {
        element.setAttribute('aria-label', label);
        element.title = label;
    }
    setLabel(previousButton, text.previous);
    setLabel(nextButton, text.next);
    setLabel(zoomOutButton, text.zoomOut);
    setLabel(zoomInButton, text.zoomIn);
    setLabel(fullscreenButton, text.fullscreen);
    setLabel(pdfLink, text.openPdf);
    pageInput.setAttribute('aria-label', text.jump);
    pageInput.title = text.jump;

    for (var number = 1; number <= PAGE_COUNT; number += 1) {
        var page = document.createElement('div');
        page.className = 'page';
        page.setAttribute('data-page-number', String(number));
        if (number === 1) {
            page.classList.add('full-cover-page');
            page.setAttribute('data-density', 'hard');
        }
        if (number === PAGE_COUNT) {
            page.classList.add('full-cover-page', 'back-cover-page');
            page.setAttribute('data-density', 'hard');
        }

        var image = document.createElement('img');
        image.src = '../../../images/icfgl/icfgl2026/images/page-' + String(number).padStart(3, '0') + '.webp';
        image.alt = 'ICFGL 2026 Abstract Proceedings - ' + text.page.toLowerCase() + ' ' + number;
        image.width = 1224;
        image.height = 1584;
        image.decoding = 'async';
        image.draggable = false;
        image.loading = number <= 3 ? 'eager' : 'lazy';
        if (number === 1) image.fetchPriority = 'high';
        page.appendChild(image);
        book.appendChild(page);
    }

    if (!window.St || !window.St.PageFlip) {
        loadingCard.lastElementChild.textContent = text.loadError;
        loadingCard.querySelector('.loading-spinner').remove();
        return;
    }

    var zoomLevel = 1;
    var resizeFrame = 0;
    var pageFlip = new St.PageFlip(book, {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        size: 'stretch',
        minWidth: 280,
        maxWidth: 4000,
        minHeight: 360,
        maxHeight: 5200,
        maxShadowOpacity: .4,
        showCover: true,
        mobileScrollSupport: true,
        usePortrait: true,
        flippingTime: 780,
        showPageCorners: true,
        disableFlipByClick: false
    });

    function isMobile() {
        return window.matchMedia('(max-width: 600px)').matches;
    }

    function getBookAspectRatio() {
        return isMobile() ? PAGE_WIDTH / PAGE_HEIGHT : (PAGE_WIDTH * 2) / PAGE_HEIGHT;
    }

    function fitBookToStage() {
        var aspectRatio = getBookAspectRatio();
        var horizontalSpace = bookStage.clientWidth >= 900 ? 180 : 24;
        var maxWidth = Math.max(280, bookStage.clientWidth - horizontalSpace);
        var maxHeight = Math.max(200, bookStage.clientHeight - 24);
        var fittedWidth = Math.min(maxWidth, maxHeight * aspectRatio);
        var fittedHeight = fittedWidth / aspectRatio;

        book.style.setProperty('--book-width', Math.round(fittedWidth) + 'px');
        book.style.setProperty('--book-height', Math.round(fittedHeight) + 'px');
        if (pageFlip.getRender()) pageFlip.update();
    }

    function applyZoom() {
        var coverOffset = '0%';
        if (!isMobile()) {
            if (book.classList.contains('front-cover-only')) coverOffset = '-25%';
            if (book.classList.contains('back-cover-only')) coverOffset = '25%';
        }
        book.style.transform = 'translateX(' + coverOffset + ') scale(' + zoomLevel + ')';
    }

    function updateUI(event) {
        var total = pageFlip.getPageCount();
        var current = typeof event.data === 'number' ? event.data : pageFlip.getCurrentPageIndex();
        var isFrontCover = current === 0;
        var isBackCover = current === total - 1;
        var isPortrait = pageFlip.getOrientation() === 'portrait' || isMobile();
        var startPage = current + 1;
        var endPage = isPortrait || isFrontCover || isBackCover ? startPage : Math.min(current + 2, total);

        book.classList.toggle('cover-only', isFrontCover || isBackCover);
        book.classList.toggle('front-cover-only', isFrontCover);
        book.classList.toggle('back-cover-only', isBackCover);
        book.classList.toggle('is-portrait', isPortrait);
        applyZoom();

        pageInfo.textContent = isFrontCover
            ? text.frontCover + ' · 1 / ' + total
            : text.page + ' ' + startPage + (endPage > startPage ? ' - ' + endPage : '') + ' / ' + total;
        pageInput.placeholder = String(startPage);
        progressBar.style.width = ((endPage / total) * 100).toFixed(3) + '%';
        previousButton.disabled = current === 0;
        nextButton.disabled = endPage >= total;
    }

    pageFlip.on('init', function (event) {
        loadingCard.hidden = true;
        updateUI(event);
    });
    pageFlip.on('flip', updateUI);
    pageFlip.on('changeOrientation', function () {
        fitBookToStage();
        updateUI({ data: pageFlip.getCurrentPageIndex() });
    });
    pageFlip.on('changeState', function (event) {
        book.classList.toggle('is-flipping', event.data !== 'read');
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));
    fitBookToStage();
    applyZoom();

    previousButton.addEventListener('click', function () {
        if (pageFlip.getCurrentPageIndex() > 0) pageFlip.flipPrev();
    });
    nextButton.addEventListener('click', function () {
        if (!nextButton.disabled) pageFlip.flipNext();
    });
    zoomInButton.addEventListener('click', function () {
        zoomLevel = Math.min(1.6, +(zoomLevel + .15).toFixed(2));
        applyZoom();
    });
    zoomOutButton.addEventListener('click', function () {
        zoomLevel = Math.max(.6, +(zoomLevel - .15).toFixed(2));
        applyZoom();
    });

    pageInput.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter') return;
        var target = parseInt(pageInput.value, 10);
        if (target >= 1 && target <= PAGE_COUNT) {
            pageFlip.turnToPage(target - 1);
            pageInput.value = '';
            pageInput.blur();
        }
    });

    fullscreenButton.addEventListener('click', function () {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
        else document.exitFullscreen();
    });
    document.addEventListener('fullscreenchange', function () {
        setLabel(fullscreenButton, document.fullscreenElement ? text.exitFullscreen : text.fullscreen);
        window.setTimeout(fitBookToStage, 80);
    });

    document.addEventListener('keydown', function (event) {
        if (document.activeElement === pageInput || event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
            event.preventDefault();
            pageFlip.flipPrev();
        } else if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
            event.preventDefault();
            pageFlip.flipNext();
        } else if (event.key === 'Home') {
            event.preventDefault();
            pageFlip.turnToPage(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            pageFlip.turnToPage(PAGE_COUNT - 1);
        }
    });

    window.addEventListener('resize', function () {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(function () {
            fitBookToStage();
            applyZoom();
        });
    });
}());