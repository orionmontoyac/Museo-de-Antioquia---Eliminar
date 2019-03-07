<script src="https://colecciones.museodeantioquia.co/wp-includes/xlsx.full.min.js" charset="utf-8"></script>
<script type="text/javascript">

/***** CAMBIO DE LOGO *****/
var logo_normal = document.getElementsByClassName("normal_logo")[0];
var logo_retina = document.getElementsByClassName("retina_logo")[0];

logo_normal.src="https://colecciones.museodeantioquia.co/wp-content/uploads/2018/10/log-museo-colecc-blanco.png";
logo_retina.src="https://colecciones.museodeantioquia.co/wp-content/uploads/2018/10/log-museo-colecc-blanco.png";

//VARIABLES GLOBALES

var dataexcel;
//FUNCIONES
function getName(name) {
  for (var i = 0; i < dataexcel.length; i++) {
    if (dataexcel[i].__EMPTY.toString() == name) {
      console.log(i);
      return dataexcel[i].__EMPTY_2;
    }
  }
}
function getAutor(name) {
  for (var i = 0; i < dataexcel.length; i++) {
    if (dataexcel[i].__EMPTY.toString() == name) {
      console.log(i);
      return dataexcel[i].__EMPTY_1;
    }
  }
}
function getDescription(name) {
  for (var i = 0; i < dataexcel.length; i++) {
    if (dataexcel[i].__EMPTY.toString() == name) {
      return dataexcel[i].__EMPTY_12;
    }
  }
}
/*----------------------------------------------------*/
/* Extracción de datos desde excel*/
function ExcelDAta(){
    console.log('Extrallendo datos desded excell');
    /* set up XMLHttpRequest */
    var url = "https://colecciones.museodeantioquia.co/wp-content/datosobras.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    dataexcel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    //console.log(dataexcel);
    //dataexcell = JSON.stringify(dataexcell, 2, 2);
    }
    oReq.send();
    /*
    La idea es que las variables images_titles_excel e images_description_excel
    sean extraidas de un archivo excel
    */
  }
ExcelDAta();

window.onload = function() {

    console.log(dataexcel);
var images = document.getElementsByClassName("image_pointer");//Get the image source
var images_titles = document.getElementsByClassName("image_title");//Get the image title html element
var images_descriptions = document.getElementsByClassName("image_description");//Get image description html element
var image_autor = document.getElementsByClassName("image_autor");//Get image autor html element
//console.log(images_titles.length);
var i;
var init, end;
var name_image, index_image;
  for (i = 0; i < images.length; i++){
    //Separando el nombre de la imagen del resto del texto
    init = Number(images[i].src.search("09/")) + 3;
    end = Number(images[i].src.search(".jpg"));
    //Nombre de imagen filtrado
    name_image = images[i].src.substr(init,end - init);
    //Posicion de la imagen en vector de images_titles_excel
    console.log('Name of image:');
    console.log(name_image);
    //console.log(index_image);

    //Asignando titulo correspondiente a imagen
    images_titles[i].innerHTML = getName(name_image);
    //Asignando Autor correspondiente a imagen
    image_autor[i].innerHTML = getAutor(name_image);
    //Asignando descripcion correspondiente a imagen
    images_descriptions[i].innerHTML = getDescription(name_image);
  }
};
</script>
