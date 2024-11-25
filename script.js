document.addEventListener('DOMContentLoaded', function () {
    const radios = document.querySelectorAll('input[name="slide"]');
    
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
    
            const card = this.nextElementSibling; 
            const btnVerMais = card.querySelector('.btn-ver-mais'); 

            
            if (this.checked) {
                btnVerMais.style.opacity = '1';  
                btnVerMais.style.transform = 'translateY(0)'; 
            } else {
                btnVerMais.style.opacity = '0';
                btnVerMais.style.transform = 'translateY(10px)'; 
            }
        });
    });
});