const radioBtnGroup = document.querySelectorAll('input[name="query"]');
const checkbox = document.getElementById("consent");

for( let i=0; i < radioBtnGroup.length; i++ ){
    radioBtnGroup[i].addEventListener( "change", (e) => {
        let radioBtn = e.target;
        let selectedQuery = document.querySelector('.selected-query');
        if( selectedQuery ) selectedQuery.classList.remove( "selected-query" );

        // console.log(`radioBtn changed`, radioBtn.id)

        if( radioBtn.checked ){
            radioBtn.parentElement.classList.add( "selected-query" );
        } 
    });
}

checkbox.addEventListener("change", function(e){
    if( this.checked ){
        this.parentElement.classList.add( "consented" );
    } else {
        this.parentElement.classList.remove( "consented" );
    }
});