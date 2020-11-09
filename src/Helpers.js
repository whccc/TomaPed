const objHelpers = {};
//ValidarCorreo
objHelpers.isValidEmail = (mail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}
//Convertir base64
objHelpers.getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
objHelpers.generarNumero=(numero)=>{
	return (Math.random()*numero).toFixed(0);
}

objHelpers.colorRGB=()=>{
	let coolor = "("+objHelpers.generarNumero(150)+"," + objHelpers.generarNumero(50) + "," + objHelpers.generarNumero(100) +",.3)";
	return "rgb" + coolor;
}
export default objHelpers;