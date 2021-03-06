//https://gist.github.com/gre/1650294
const EasingFunctions = {
    // no easing, no acceleration
    linear: function(t) {
        return t;
    },
    // accelerating from zero velocity
    easeInQuad: function(t) {
        return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad: function(t) {
        return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic: function(t) {
        return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic: function(t) {
        return --t * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function(t) {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart: function(t) {
        return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart: function(t) {
        return 1 - --t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint: function(t) {
        return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint: function(t) {
        return 1 + --t * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
};

function go(url) {
    window.open(url);
}

let scrollAnimating;
let cancelScrollAnimation;
let scrollTimeStart;
let scrollLength;
let scrollStart;
function animateScroll(target, animationTime, easingFunc) {
    animationTime = animationTime || 1500;
    easingFunc = easingFunc || EasingFunctions.easeInOutCubic;
    let targetPosition;
    if (typeof target !== "number") {
        //target이 선택자라고 가정
        let element = document.querySelector(target);
        targetPosition = getScrollPosition(element);
    } else {
        targetPosition = target;
    }
    if (scrollAnimating) {
        cancelScrollAnimation = true;
        while (!scrollAnimating);
    }
    function step(time) {
        //스크롤 시작시간과 시작위치 초기화
        if (!scrollTimeStart) {
            scrollTimeStart = time;
            scrollStart = getScrollTop();
            scrollLength = targetPosition - scrollStart;
            scrollAnimating = true;
        }
        //현재 진행률 계산
        let progress = (time - scrollTimeStart) / animationTime;
        //애니메이션 종료조건 체크
        if (cancelScrollAnimation || progress > 1) {
            cancelScrollAnimation = false;
            scrollAnimating = false;
            scrollTimeStart = undefined;
            return;
        }
        //alert(getScrollTop());
        //애니메이션된 스크롤 위치 계산
        let animatedPos = easingFunc(progress) * scrollLength + scrollStart;
        setScrollTop(animatedPos);
        //다음 애니메이션 스케줄링
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function scrollToBottom() {
    animateScroll(getScrollHeight());
}

//안드로이드 웹뷰 등 기타의 브라우저에서 scrollTop 안되는 현상 수정
//https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
function getScrollingElementProperty(p) {
    return "scrollingElement" in document
        ? document.scrollingElement[p]
        : document.documentElement[p];
}
function setScrollingElementProperty(p, d) {
    if ("scrollingElement" in document) {
        document.scrollingElement[p] = d;
    } else {
        //ie
        document.documentElement[p] = d;
    }
}
function getScrollTop() {
    return getScrollingElementProperty("scrollTop");
}

function setScrollTop(d) {
    setScrollingElementProperty("scrollTop", d);
}

function getScrollHeight() {
    return getScrollingElementProperty("scrollHeight");
}

function getScrollPosition(targetElement) {
    let bcr = targetElement.getBoundingClientRect();
    let elemOffset = "y" in bcr ? bcr.y : bcr.top;
    return getScrollTop() + elemOffset;
}
