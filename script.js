document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CIBLAGE DU BON ÉLÉMENT QUI SCROLLE ---
    const scrollContainer = document.querySelector('.main-content');
    
    // --- 2. EFFET MACHINE À ÉCRIRE ---
    const textElement = document.querySelector('.code-text code');
    const phrase = "<code > Je construis des infrastructures sécurisées. </code>";
    
    let charIndex = 0;
    let isDeleting = false;

    if(textElement) {
        function typeEffect() {
            const currentText = phrase.substring(0, charIndex);
            textElement.textContent = currentText;

            let typeSpeed = isDeleting ? 30 : 80; 

            if (!isDeleting && charIndex < phrase.length) {
                charIndex++;
                setTimeout(typeEffect, typeSpeed);
            } 
            else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, typeSpeed);
            } 
            else {
                isDeleting = !isDeleting;
                setTimeout(typeEffect, isDeleting ? 2000 : 500);
            }
        }
        typeEffect();
    }

    // --- 3. MENU ACTIF AU SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.right-navbar .nav-link');

    if(scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = scrollContainer.scrollTop; 
            
            // NOUVEAU : On calcule la hauteur totale pour savoir si on est tout en bas
            const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight; 

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Déclenchement un peu avant d'arriver sur la section (-250px)
                if (scrollPosition >= (sectionTop - 250)) {
                    current = section.getAttribute('id');
                }
            });

            // NOUVEAU : Si on a scrollé tout en bas, on force l'activation de Contact
            if (Math.ceil(scrollPosition) >= maxScroll - 20) {
                current = 'contact';
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href'); 
                if (href.includes(current) && current !== '') {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- 4. MENU MOBILE ---
    const mobileBtn = document.createElement('div');
    mobileBtn.classList.add('mobile-menu-btn');
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileBtn);

    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);

    function toggleMenu() {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
            mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // --- 5. FONCTIONNALITÉS DU LABO (Zone Interactive) ---

    // A. Bouton Message Caché (Motivation)
    const btnReveal = document.getElementById('btn-reveal');
    const secretMessage = document.getElementById('secret-message');

    if(btnReveal && secretMessage) {
        btnReveal.addEventListener('click', function() {
            secretMessage.style.display = 'block';
            this.style.display = 'none';
        });
    }

    // B. Ajout Dynamique de Compétence (Avec Suppression)
    const btnAddSkill = document.getElementById('btn-add-skill');
    const inputSkill = document.getElementById('new-skill');
    const listSkills = document.getElementById('dynamic-skills-list');

    if(btnAddSkill && inputSkill && listSkills) {
        btnAddSkill.addEventListener('click', function() {
            const val = inputSkill.value;
            
            if(val.trim() !== "") {
                const newLi = document.createElement('li');
                const textSpan = document.createElement('span');
                textSpan.textContent = val;
                
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = '<i class="fas fa-times"></i>';
                btnDelete.classList.add('btn-delete-skill');
                
                btnDelete.addEventListener('click', function() {
                    newLi.remove();
                });

                newLi.appendChild(textSpan);
                newLi.appendChild(btnDelete);
                listSkills.appendChild(newLi);
                
                inputSkill.value = "";
            } else {
                alert("Oups !! il est impossible d'ajouter cette compétence. Veuillez écrire une compétence !");
            }
        });
    }

    // --- 6. FONCTIONNALITÉ AGRANDISSEMENT DES IMAGES (LIGHTBOX) ---
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const floatImages = document.querySelectorAll('.float-img');

    if (lightbox && lightboxImg && floatImages) {
        // Ouvrir la lightbox au clic sur une image
        floatImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex'; // On affiche le conteneur
                lightboxImg.src = this.src; // On copie le chemin de l'image cliquée
                setTimeout(() => lightbox.classList.add('active'), 10); // Petit délai pour l'animation CSS
            });
        });

        // Fonction pour fermer la lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300); // Attend la fin de l'animation CSS avant de masquer
        }

        // Fermer au clic sur la croix
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Fermer au clic n'importe où en dehors de l'image (sur le fond flou)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});