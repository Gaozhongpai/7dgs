document.addEventListener('DOMContentLoaded', domReady);

function domReady() {
    new Dics({
        container: document.querySelectorAll('.b-dics')[0],
        hideTexts: false,
        textPosition: "bottom"
    });
    new Dics({
        container: document.querySelectorAll('.b-dics')[1],
        hideTexts: false,
        textPosition: "bottom"
    });
}

function objectSceneEvent(idx) {
    let dics = document.querySelectorAll('.b-dics')[0];
    let sections = dics.getElementsByClassName('b-dics__section');
    let imagesLength = 4;

    updateImages(sections, idx, imagesLength, 'object');
    updateTabStates('object-scale-recon', idx);
}

function dropobjectSceneEvent(idx) {
    let dics = document.querySelectorAll('.b-dics')[1];
    let sections = dics.getElementsByClassName('b-dics__section');
    let columnNames = ['00', '10', '30', '50', '70', '90', '99'];

    let imageSuffix = '00019.png';
    let paths = [
        `resources/drop/3dgs/${columnNames[idx]}/${imageSuffix}`,
        `resources/drop/ours/${columnNames[idx]}/${imageSuffix}`,
        `resources/drop/gt/${columnNames[idx]}/${imageSuffix}` // Fix for GT path
    ];

    for (let i = 0; i < sections.length; i++) {
        let imageContainer = sections[i].getElementsByClassName('b-dics__image-container')[0];
        if (imageContainer) {
            let image = imageContainer.getElementsByClassName('b-dics__image')[0];
            if (image) {
                image.src = paths[i];
            }
        }
    }

    updateTabStates('dropobject-scale-recon', idx);
}

function updateImages(sections, idx, imagesLength, sliderType) {
    for (let i = 0; i < imagesLength; i++) {
        let imageContainer = sections[i].getElementsByClassName('b-dics__image-container')[0];
        if (imageContainer) {
            let image = imageContainer.getElementsByClassName('b-dics__image')[0];
            if (image) {
                let imageFolder = getImageFolder(idx, sliderType);
                let imageFileName = getImageFileName(i, sliderType);
                image.src = `resources/image/${imageFolder}/${imageFileName}`;
            }
        }
    }
}

function updateTabStates(navId, activeIdx) {
    let navItems = document.getElementById(navId).getElementsByClassName('nav-item');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].children[0].className = (activeIdx === i) ? "nav-link active" : "nav-link";
    }
}

function getImageFolder(idx, sliderType) {
    let folders = ['bunny', 'cloud', 'ct', 'explosion', 'smoke', 'suzanne'];
    return folders[idx];
}

function getImageFileName(imageIndex, sliderType) {
    let filenames = ['3dgs.png', 'ndg.png', 'ours.png', 'gt.png'];
    return filenames[imageIndex];
}