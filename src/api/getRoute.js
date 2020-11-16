// Función externa para determinar la imageBackground y colores del nombre y profesión a mostrarse en la pantalla de detalles, según la nación a la que pertenezca el personaje
export function getRoute(affiliation){
  const response = [];
  if (affiliation) {
    if (affiliation.includes("Air") || affiliation.toLowerCase().includes("airbending")) {
      response.push(require("../../assets/airHeader.png"),"#ff9642");
      return response;
    } 
    else if (affiliation.includes("Spirit")) {
      response.push(require("../../assets/spiritHeader.png"),"#57437d");
      return response;
    } 
    else if (affiliation.includes("Earth") || affiliation.includes("Metal") || affiliation.toLowerCase().includes("earthbending")) {
      response.push(require("../../assets/earthHeader.png"),"#335d2d");
      return response;
    } 
    else if (affiliation.includes("Water") || affiliation.toLowerCase().includes("waterbending")) {
      response.push(require("../../assets/waterHeader.png"),"#2d6187");
      return response;
    } 
    else if (affiliation.includes("Fire")) {
      response.push(require("../../assets/fireHeader.png"),"#af2d2d");
      return response;
    } 
    else {
      response.push(require("../../assets/notDefinedHeader.png"),"#646464");
      return response;
    }
  } 
  else {
    response.push(require("../../assets/notDefinedHeader.png"),"#646464");
    return response;
  } 
}