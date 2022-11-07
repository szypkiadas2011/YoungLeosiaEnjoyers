document.getElementById("Submit").onclick = function formularz(){
    const imie = document.getElementById("imie").value;
    const nazwisko = document.getElementById("nazwisko").value;
    const data = document.getElementById("data").value;
    const plec = document.getElementById("plec").value;
    const kolor = document.getElementById("colorpicker").value;

    if(imie != "" && nazwisko != "" && data != "" && plec != "") {
        if(kolor == "#ff0000"){
            alert("troszke sus")
        }
        console.log(data)
        alert("Formularz wysłany!")
    }else alert("Uzupełnij formularz byku")
};

