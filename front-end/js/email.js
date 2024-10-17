 async function generateOTP(){
   const email = document.getElementById("email").value;
   await fetch("http://localhost:3003/api/generateotp",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email})
   }).then(async(res)=>{
    console.log(res);
    const data = await res.json()
    console.log(data);
    
    if(res.status==200){
        localStorage.setItem("email",email)
        alert(data.msg)
    }
    else{
        alert(data.msg)
    }

   }).catch((error)=>{
        console.log(error);
    

   })
   
   
   
   
}