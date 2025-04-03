document.getElementById('questionnaireForm').addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('https://valorous-adhesion.vercel.app/api/submit', { // URL mise à jour
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parent: { "database_id": "1c4ca37fe31780ab8ef1cd7f94dd7bb8" },
            properties: {
                "Nom": {
                    "title": [
                        {
                            "text": {
                                "content": document.querySelector('input[name="nom"]').value
                            }
                        }
                    ]
                },
                "Date de naissance": {
                    "date": {
                        "start": document.querySelector('input[name="date"]').value
                    }
                },
                "Téléphone": {
                    "phone_number": document.querySelector('input[name="phone"]').value
                },
                "Adresse": {
                    "rich_text": [
                        {
                            "text": {
                                "content": document.querySelector('textarea[name="adresse"]').value
                            }
                        }
                    ]
                },
                "Intérêt": {
                    "select": {
                        "name": document.querySelector('input[name="interet"]:checked').value
                    }
                },
                "Type de mentor": {
                    "select": {
                        "name": document.querySelector('input[name="type-mentor"]:checked')?.value || 
                                document.getElementById('type-mentor-autre').value
                    }
                },
                "EuMentor": {
                    "select": {
                        "name": document.querySelector('input[name="EuMentor"]:checked')?.value
                    }
                },
                "Leçon": {
                    "rich_text": [
                        {
                            "text": {
                                "content": document.querySelector('textarea[name="Leçon"]').value
                            }
                        }
                    ]
                },
                "Qualités": {
                    "rich_text": [
                        {
                            "text": {
                                "content": document.querySelector('textarea[name="qualites"]').value
                            }
                        }
                    ]
                },
                "Relation mentorale": {
                    "select": {
                        "name": document.querySelector('input[name="relation"]:checked')?.value || 
                                document.getElementById('relation-autre').value
                    }
                },
                "Disponibilité": {
                    "select": {
                        "name": document.querySelector('input[name="frequence"]:checked')?.value || 
                                document.getElementById('frequence-autre').value
                    }
                },
                "Activités préférées": {
                    "select": {
                        "name": document.querySelector('input[name="activites"]:checked')?.value || 
                                document.getElementById('activites-autre').value
                    }
                },
                "Mentor inspirant": {
                    "rich_text": [
                        {
                            "text": {
                                "content": document.querySelector('textarea[name="mentor-inspirant"]').value
                            }
                        }
                    ]
                },
                "Plus grande peur": {
                    "rich_text": [
                        {
                            "text": {
                                "content": document.querySelector('textarea[name="peur"]').value
                            }
                        }
                    ]
                },
                "Profession": {
                    "select": {
                        "name": document.querySelector('input[name="profession"]:checked').value
                    }
                },
                "Cadre de travail": {
                    "select": {
                        "name": document.querySelector('input[name="cadre"]:checked').value
                    }
                }
            }
        })
    })
    .then((response) => {
        if (!response.ok) {
            console.error('Erreur lors de la soumission du formulaire');
        }
        return response.json(); // Ajout pour traiter la réponse JSON
    })
    .then(data => console.log('Réponse du serveur :', data)) // Affiche la réponse du serveur
    .catch(err => console.error('Erreur réseau ou serveur :', err)); 
});

// Fermer le modal en cliquant sur le bouton "OK"
document.getElementById('closeModal').addEventListener('click', function () {
    const modal = document.getElementById('customModal');
    modal.style.display = 'none';
});