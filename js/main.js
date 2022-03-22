//progress bar

const options = {
    classname: 'progressbar',
    target: document.getElementById('js--progressbar__container')
}

const progressbar = new Nanobar(options);

function progressBarUpdate() {
    let u = state.backed > 100000 ? 99.9 : (state.backed * 100 / 100000)
    progressbar.go(u);
}

//state of site
function txtCont(elm, cnt) {
    elm.innerText = cnt
}

function format(num, symbol) {

    let b = num.toString().split('').reduce((acc, item, idx, arr) => {
        console.log('acc', acc, 'idx', idx);
        const l = arr.length;
        if ((l - 1 - idx) % 3 == 0 && idx != l - 1) {
            acc = acc.concat(item, symbol)
            return acc
        }
        acc = acc.concat(item);
        return acc
    }, '');
    // b = b.split('').reverse().join("");
    return b;
}


const state = {
    total: 100000,
    backed: 89914,
    addBacker (rew,idx) {
        this.backed = this.backed + rew;
        this.backers = this.backers + 1;

        if(idx != undefined) {
            this.offerAmount[idx] = this.offerAmount[idx] - 1
        }
        this.render();
    },
    backers: 5007,
    days: 56,
    offerPrice: [25, 75, 200],
    offerAmount: [101, 64, 0],
    render: function () {
        for (key of Object.keys(state)) {
            if (typeof state[key] != 'function') {
                if (Array.isArray(state[key])) {
                    let arr = state[key];
                    arr.forEach((item, idx) => {
                        console.log(idx, item)
                        let elm = document.querySelectorAll(`[data-${key}-${idx}]`)
                        if(elm != null || elm.length != 0) {
                            elm.forEach(el => txtCont(el, item))
                        }
                    })
                } else {
                    let elm = document.querySelectorAll(`[data-${key}]`)
                    if (elm != null) {
                        let v = format(state[key], ',')
                        elm.forEach(el => txtCont(el, v))
                    }
                }
            }
        }
        progressBarUpdate()
    }
}

state.render();

//modals
//selection modal

const pledgeModal = new tingle.modal({
    // footer: true,
    // stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "",
    cssClass: ['pledge__modal'],
    onOpen: function () {
        console.log('modal open');
    },
    onClose: function () {
        console.log('modal closed');
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
})

pledgeModal.setContent(document.getElementById("js--back-project-modal"));

const projectBacking = document.getElementById('js--back-project');

projectBacking.addEventListener('click', function () {
    pledgeModal.open()
})

const modalCloseButton = document.querySelector('.pledge__close')
modalCloseButton.addEventListener('click', function() {
    pledgeModal.close()
})

//thank you modal

const thankyouModal = new tingle.modal({
    // footer: true,
    // stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "",
    cssClass: ["tingle-modal--small"],
    onOpen: function () {
        console.log('modal open');
    },
    onClose: function () {
        console.log('modal closed');
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
})

thankyouModal.setContent(document.getElementById("js--thank_you-modal"));

document.querySelectorAll('.js--pledge__submit').forEach(item => {
    item.addEventListener('click', (event) => {
        pledgeModal.close()
        thankyouModal.open();
    })
})


document.getElementById('js--thank-you__submit').addEventListener('click', () => {
    thankyouModal.close();
})

//selection managing

const pledgeSelect = document.querySelectorAll('.js--pledge__select');

pledgeSelect.forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'));
        const n = item.dataset.select;
        document.getElementById(n).classList.toggle('selected');
        // document.getElementById(item.dataset.pledge).classList.toggle('selected')
        // item.classList.toggle('selected')
    })
})

//rewerd select managing


const rewardSelect = document.querySelectorAll('.js--reward__select');

rewardSelect.forEach(item => {
    item.addEventListener('click', event => {
        let idx = event.target.dataset['offer'];
        let reward = state.offerPrice[idx];
        state.addBacker(reward, idx);
        thankyouModal.open()
    })
})

//pledge managment

const pledgeSubmit = document.querySelectorAll('.js--pledge__submit');

pledgeSubmit.forEach(item => {
    item.addEventListener('click', (event) => {
        let n = event.target.dataset.select;
        const v = Number(document.getElementById(`js--data-select__input-${n}`).value);
        if(typeof n === "number") {
            state.addBacker(v, n)
        } else {
            state.addBacker(v)
        }
    })
})


//bookmarking web page

let bookmarker = document.getElementById('js--button__bookmarker');

bookmarker.addEventListener('click', function (event) {
    // event.preventDefault();
    var bookmarkUrl = "localhost:5500";
    var bookmarkTitle = "Bamboo shit";

    if (window.sidebar) { // For Mozilla Firefox Bookmark
        window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
    } else if (window.external || document.all) { // For IE Favorite
        window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
    } else { // for other browsers which does not support
        alert('Your browser does not support this bookmark action');
        return false;
    }
})

function toggleClass(event) {
    const nav = document.getElementById('js--nav');
    nav.classList.toggle('open');
    console.log(nav);
}
const menuToggle = document.getElementById('js--menu-toggle');
const nav = document.getElementById('js--nav');

menuToggle.addEventListener('click', toggleClass);
nav.addEventListener('click', function (event) {
    if (event.target.id == 'js--nav') {
        event.target.classList.toggle('open')
    }
});
