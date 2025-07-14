const radioBtnGroup = document.querySelectorAll('input[name="query"]');
const checkbox = document.getElementById("consent");
const queryGroup = document.getElementById( "queryGroup" );
const consentError = document.getElementById("consentError");

for( let i=0; i < radioBtnGroup.length; i++ ){
    radioBtnGroup[i].addEventListener( "change", (e) => {
        let radioBtn = e.target;
        let selectedQuery = document.querySelector('.selected-query');
        if( selectedQuery ) selectedQuery.classList.remove( "selected-query" );

        queryGroup.setAttribute("aria-invalid", "false");

        if( radioBtn.checked ){
            radioBtn.parentElement.classList.add( "selected-query" );
        } 
    });
}

checkbox.addEventListener("change", function(e){
    this.setAttribute("aria-invalid", "false");
    consentError.classList.remove( "show-consent-error" );

    if( this.checked ){
        this.parentElement.classList.add( "consented" );
    } else {
        this.parentElement.classList.remove( "consented" );
    }
});

const myForm = document.getElementById('form');
const formElements = myForm.elements;

function processForm(){
    for(let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if( element.value == "" ){
            element.setAttribute("aria-invalid", "true");
        }

        if( element.type == "checkbox" && !element.checked ){
            element.setAttribute("aria-invalid", "true");
            consentError.classList.add( "show-consent-error" );
        }
    }

    const selectedQuery = document.querySelector('input[name="query"]:checked');

    if( !selectedQuery ) queryGroup.setAttribute("aria-invalid", "true");
}

for(let i = 0; i < formElements.length; i++) {
    const element = formElements[i];

    if( element.type != "checkbox" && element.type != "radio" ){
        element.addEventListener( "input", function(e){
            e.target.setAttribute("aria-invalid", "false");
        });
    }
}