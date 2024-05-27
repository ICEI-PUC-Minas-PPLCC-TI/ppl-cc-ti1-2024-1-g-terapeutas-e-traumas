function toggle(el){
    var display = document.getElementById(el).style.display;
     if (display == "none"){
       document.getElementById(el).style.display = 'block';
     }
    else{
     document.getElementById(el).style.display = 'none';
    }
   }

function showSuccessPopup() {
    alert("Formulario enviado com sucesso");
}

function submitForm() {
    const form = document.getElementById('cadastroForm');
    const formData = new FormData(form);

    const terapeuta = {
        idade: formData.get('idade'),
        genero: formData.get('genero'),
        anos_de_experiencia: formData.get('anos_de_experiencia'),
        especialidade: formData.get('especialidade'),
        crp: formData.get('crp'),
        contato: {
            telefone: formData.get('telefone'),
            email: formData.get('email')
        },
        modalidade: [],
        preco_da_hora: formData.get('preco_da_hora'),
        endereco: {
            rua: formData.get('rua'),
            numero: formData.get('numero'),
            complemento: formData.get('complemento'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            estado: formData.get('estado'),
            cep: formData.get('cep')
        },
        planos_medicos: []
    };

    if (formData.get('modalidade') === 'online') terapeuta.modalidade.push('online');
    if (formData.get('modalidade') === 'presencial') terapeuta.modalidade.push('presencial');
    
    if (formData.get('planos_medicos') === 'UNIMED') terapeuta.planos_medicos.push('UNIMED');
    if (formData.get('planos_medicos') === 'SulAmerica') terapeuta.planos_medicos.push('SulAmerica');
    if (formData.get('planos_medicos') === 'Amil') terapeuta.planos_medicos.push('Amil');

    fetch('http://localhost:3000/terapeutas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(terapeuta)
    })
    .then(response => response.json())
    .then(data => {
        showSuccessPopup();
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}