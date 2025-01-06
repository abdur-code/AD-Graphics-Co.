document.addEventListener('DOMContentLoaded', () => {
    const galleryData = {
        interior: {
            title: 'Interior Works Gallery',
            images: ['./Website/Interior/interior1.jpg', './Website/Interior/interior2.jpg', './Website/Interior/interior3.jpg', './Website/Interior/interior4.jpg', './Website/Interior/interior5.jpg']
        },
        exterior: {
            title: 'Exterior Works Gallery',
            images: ['./Website/Exterior/exterior1.jpg', './Website/Exterior/exterior2.jpg', './Website/Exterior/exterior3.jpg']
        },
        printing: {
            title: 'Printing Services Gallery',
            images: ['./Website/Printing/printing1.jpg', './Website/Printing/printing2.jpg']
        },
        signage: {
            title: 'Signage Solutions Gallery',
            images: ['./Website/Signage/signage1.jpg', './Website/Signage/signage2.jpg', './Website/Signage/signage3.jpg', './Website/Signage/signage4.jpg']
        }
    };

    let currentCategory = null;
    let currentImageIndex = 0;
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));

    const updateGalleryView = () => {
        const data = galleryData[currentCategory] || { title: '', images: [] };
        const { title, images } = data;
        
        document.getElementById('galleryTitle').textContent = title;
        document.getElementById('galleryImage').src = images[currentImageIndex];
        document.getElementById('currentImageIndex').textContent = currentImageIndex + 1;
        document.getElementById('totalImages').textContent = images.length;
    };

    const showPreviousImage = () => {
        const images = galleryData[currentCategory].images;
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryView();
    };

    const showNextImage = () => {
        const images = galleryData[currentCategory].images;
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryView();
    };

    const openGallery = category => {
        currentCategory = category;
        currentImageIndex = 0;
        updateGalleryView();
        galleryModal.show();
    };

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => openGallery(card.dataset.category));
    });

    document.getElementById('prevButton').addEventListener('click', showPreviousImage);
    document.getElementById('nextButton').addEventListener('click', showNextImage);

    document.addEventListener('keydown', e => {
        if (!galleryModal._isShown) return;
        
        const keyActions = {
            ArrowLeft: showPreviousImage,
            ArrowRight: showNextImage,
            Escape: () => galleryModal.hide()
        };

        keyActions[e.key]?.();
    });
});
