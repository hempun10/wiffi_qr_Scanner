const wrapper = document.querySelector('.wrapper'),
        form = document.querySelector('form'),
        input = document.querySelector('input'),
        infoText = form.querySelector('p'),
        copyBtn = wrapper.querySelector('.copy'),
        closeBtn = wrapper.querySelector('.close');

const fetchRequest = (formData,file) => {
    infoText.innerHTML="Scanning QR Code...."
    //Sending post request to qr server api with passing
    //formData object as body and getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: 'POST',body:formData
    }).then(res =>res.json()).then(result=>{
        result = (result[0].symbol[0].data);
        // console.log(result);
        infoText.innerHTML= result? "Upload to QR Code Scan":"Couldn't Scan QR Code";
        if(!result) return; //Adding Validation for Checking whether it's a qr or not
        wrapper.querySelector('textarea').innerHTML=result;
        form.querySelector('img').src=URL.createObjectURL(file);
        wrapper.classList.add('active');
    }).catch(()=>{ //Catch method will run if there are any erro during requesting API
        infoText.innerHTML="Couldn't Scan QR Code"; 
    })
}
form.addEventListener('change', (e) => {
        const file = e.target.files[0]; //getting user selected file
        if (!file) return;
        const formData = new FormData();//Creating a new formData object
        formData.append('file', file); //Appending file to formData object
        fetchRequest(formData,file)
})

copyBtn.addEventListener('click', () => {
    const text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener('click', () => input.click());

closeBtn.addEventListener('click', () => wrapper.classList.remove('active'));