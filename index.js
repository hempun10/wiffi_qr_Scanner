const wrapper = document.querySelector('.wrapper'),
        form = document.querySelector('form'),
        input = document.querySelector('#get-file'),
        infoText = form.querySelector('p'),
        copyBtn = wrapper.querySelector('.copy'),
        closeBtn = wrapper.querySelector('.close'),
        toogleSwitch =document.querySelector('#checkbox'),
        toggleIcon = document.querySelector('#toogle-icon');

const fetchRequest = (formData,file) => {
    infoText.innerHTML="Scanning QR Code...."
    //Sending post request to qr server api with passing
    //formData object as body and getting response from it
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method: 'POST',body:formData
    }).then(res =>res.json()).then(result=>{
        // result = (result[0].symbol[0].data);
        result = result[0].symbol[0].data.replace(/;/g, ';\n');
        // console.log(result);
         result = result
        .replace(/S:/g, 'Name: ')
        .replace(/T:/g, 'Security: ')
        .replace(/P:/g, 'Password: ')
        .replace(/H:/g, 'Connection: ')

        infoText.innerHTML= result? "Upload  QR Code to Scan....":"Couldn't Scan QR Code.Try Again :)";
        if(!result) return; //Adding Validation for Checking whether it's a qr or not
        wrapper.querySelector('textarea').innerHTML=result;
        form.querySelector('img').src=URL.createObjectURL(file);
        wrapper.classList.add('active');
    }).catch(()=>{ //Catch method will run if there are any erro during requesting API
        infoText.innerHTML="Couldn't Scan QR Code.Try Again :)"; 
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



// DarkMode
const darkMode =() =>{
    toggleIcon.children[0].classList.replace('bx-sun','bx-moon')
}

// Light Mode
const lightMode =() =>{
    toggleIcon.children[0].classList.replace('bx-moon','bx-sun')
    // console.log(toggleIcon);
}


// Switch Theme Dynamically 
const switchTheme =(key)=>{
    if(key.target.checked){
        document.documentElement.setAttribute('data-theme','dark')
        localStorage.setItem('theme','dark')
        darkMode();
    }else{
        document.documentElement.setAttribute('data-theme','light')
        localStorage.setItem('theme','light')
        lightMode();
    }
}

// Event Listner For Day Night Toogle
toogleSwitch.addEventListener('change',switchTheme);

//Check Local Storage For theme
const currentTheme = localStorage.getItem('theme')
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme)
    if(currentTheme === 'dark'){
        toogleSwitch.checked = true;
        darkMode();
    }
}