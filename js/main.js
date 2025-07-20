const radioBtnGroup = document.querySelectorAll('input[name="query"]');
const checkbox = document.getElementById("consent");
const queryGroup = document.getElementById( "queryGroup" );
const consentError = document.getElementById("consentError");
const myForm = document.getElementById('form');
const formElements = myForm.querySelectorAll('input');
const textarea = document.getElementById('message');

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

for(let i = 0; i < formElements.length; i++) {
    const element = formElements[i];

    if( element.type != "checkbox" && element.type != "radio" ){
        element.addEventListener( "input", function(e){
            e.target.setAttribute("aria-invalid", "false");
            document.getElementById( "successMsg" ).style.display = "none";
        });
    }
}

textarea.addEventListener( "input", function(e){
    e.target.setAttribute("aria-invalid", "false");
});

function processForm(){
    let isValid = true;

    for(let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if( element.value.trim() == "" ){
            element.setAttribute("aria-invalid", "true");
            isValid = false;
        }

        if( element.type == "email" && !element.checkValidity() ){
            isValid = false;
            element.setAttribute("aria-invalid", "true");
        }

        if( element.type == "checkbox" && !element.checked ){
            element.setAttribute("aria-invalid", "true");
            consentError.classList.add( "show-consent-error" );
            isValid = false;
        }
    }

    const selectedQuery = document.querySelector('input[name="query"]:checked');

    if( !selectedQuery ){
        queryGroup.setAttribute("aria-invalid", "true");
        isValid = false;
    }

    if( textarea.value.trim() == "" ){
        isValid = false;
        textarea.setAttribute("aria-invalid", "true");
    }
    
    if( isValid ){
        document.getElementById( "successMsg" ).style.display = "block";
        clearAllInputs();
    }
}

function clearAllInputs(){
    for(let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if( element.type != "checkbox" && element.type != "radio" ){
            element.setAttribute("aria-invalid", "false");
            element.value = "";
        }
    }

    let selectedQuery = document.querySelector('.selected-query');
    if( selectedQuery ){
        selectedQuery.classList.remove( "selected-query" );
        selectedQuery.querySelector( "input" ).checked = false;
    }

    queryGroup.setAttribute("aria-invalid", "false");
    textarea.setAttribute("aria-invalid", "false");
    textarea.value = "";

    checkbox.setAttribute("aria-invalid", "false");
    checkbox.checked = false;
    consentError.classList.remove( "show-consent-error" );
    checkbox.parentElement.classList.remove( "consented" );

}