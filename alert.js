document.querySelectorAll(".btn-next").forEach((btn) => {
    btn.addEventListener("click", function (event) {
        const currentStep = this.closest(".form-step");
        const currentStepNumber = parseInt(currentStep.dataset.step);
        const nextStep = document.querySelector(`.form-step[data-step="${currentStepNumber + 1}"]`);
  
        let isFormValid = true;
  
        // Réinitialiser tous les messages d'erreur de cette étape
        currentStep.querySelectorAll(".error-message").forEach((errorDiv) => {
            errorDiv.textContent = "";
        });
  
        // Vérifier tous les champs de l'étape actuelle
        currentStep.querySelectorAll("input[required], textarea[required], select[required]").forEach((field) => {
            const errorFieldDiv = currentStep.querySelector(`#error-${field.id || field.name}`);
            
            if (!field.value.trim()) {
                if (errorFieldDiv) {
                    errorFieldDiv.textContent = "Ce champ est requis.";
                }
                isFormValid = false;
            }
        });
  
        // Vérification spéciale pour les groupes radio
        currentStep.querySelectorAll(".radio-group").forEach((radioGroup) => {
            const radioName = radioGroup.querySelector("input[type='radio']").name;
            const radios = currentStep.querySelectorAll(`input[name="${radioName}"]:checked`);
            const errorRadioDiv = currentStep.querySelector(`#error-${radioName}`);
            
            if (radios.length === 0) {
                if (errorRadioDiv) {
                    errorRadioDiv.textContent = "Veuillez sélectionner une option.";
                }
                isFormValid = false;
            } else {
                // Si "Autre" est sélectionné, vérifier que le champ texte est rempli
                const selectedRadio = radios[0];
                if (selectedRadio.value === "autre") {
                    const otherInput = currentStep.querySelector(`#${radioName}-autre`);
                    if (otherInput && !otherInput.value.trim()) {
                        if (errorRadioDiv) {
                            errorRadioDiv.textContent = "Veuillez spécifier votre réponse.";
                        }
                        isFormValid = false;
                    }
                }
            }
        });
  
        // Empêcher le passage à l'étape suivante si le formulaire n'est pas valide
        if (!isFormValid) {
            event.preventDefault();
            // Faire défiler jusqu'au premier champ invalide
            const firstInvalidField = currentStep.querySelector(".error-message:not(:empty)");
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Passer à l'étape suivante si tout est valide
            currentStep.classList.remove("active");
            nextStep.classList.add("active");
  
            // Mettre à jour la barre de progression
            document.querySelector(`.progress-step[data-step="${currentStepNumber + 1}"]`).classList.add("active");
        }
    });
  });
  
  // Gérer le bouton "Précédent" (inchangé)
  document.querySelectorAll(".btn-prev").forEach((btn) => {
    btn.addEventListener("click", function () {
        const currentStep = this.closest(".form-step");
        const currentStepNumber = parseInt(currentStep.dataset.step);
        const previousStep = document.querySelector(`.form-step[data-step="${currentStepNumber - 1}"]`);
  
        currentStep.classList.remove("active");
        previousStep.classList.add("active");
  
        // Mettre à jour la barre de progression
        document.querySelector(`.progress-step[data-step="${currentStepNumber}"]`).classList.remove("active");
    });
  });
  
  // Afficher/masquer les champs "Autre" quand l'option est sélectionnée
  document.querySelectorAll('input[type="radio"][value="autre"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const otherInputId = `${this.name}-autre`;
        const otherInput = document.getElementById(otherInputId);
        if (otherInput) {
            otherInput.style.display = this.checked ? 'block' : 'none';
            if (this.checked) otherInput.focus();
        }
    });
  });